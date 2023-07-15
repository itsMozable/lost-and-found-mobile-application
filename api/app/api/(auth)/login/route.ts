import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessionsDatabase';
import { getUserWithPasswordHashByUsername } from '../../../../database/usersDatabase';
import { secureCookieOptions } from '../../../../utils/cookies';
import { createCsrfSecret } from '../../../../utils/csrf';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: {
        userName: string;
        token: string;
      };
    }
  | Error;

const userLoginSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  console.log('Check User Schema');
  const result = userLoginSchema.safeParse(body);

  console.log({ result: result });
  if (!result.success) {
    console.log({ error: result.error });
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      { status: 400 },
    );
  }

  console.log({ 'verify userdata': result.data.userName });

  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.userName,
  );

  console.log({ 'hashed user': userWithPasswordHash });
  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }

  console.log('verify password');
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }
  console.log('Password accepted - please proceed');

  console.log('Secret Token created - please proceed');
  const token = crypto.randomBytes(50).toString('base64');
  const csrfSecret = createCsrfSecret();

  console.log('Session created - please proceed');
  const session = await createSession(
    token,
    csrfSecret,
    userWithPasswordHash.id,
  );

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  async function POST(request: NextRequest) {
    const token = await request.headers.get('sessionToken');
  }
  console.log({ token });

  return NextResponse.json(
    {
      user: {
        userName: userWithPasswordHash.userName,
        token: session.token,
      },
    },
    {
      status: 200,
    },
  );
}
