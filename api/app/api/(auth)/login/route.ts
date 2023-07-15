import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessionsDatabase';
import { getUserWithPasswordHashByUsername } from '../../../../database/usersDatabase';
import { UserLogin } from '../../../../migrations/1687369134-createTableUsers';
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
  // only for Jose not for pocket-offer
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  // 1. get the credentials from the body
  console.log('Check User Schema');
  const result = userLoginSchema.safeParse(body);

  // 2. verify the user data and check that the name is not taken
  console.log({ result: result });
  if (!result.success) {
    // zod send you details about the error
    console.log({ error: result.error });
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      { status: 400 },
    );
  }

  console.log({ 'verify userdata': result.data.userName });
  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.userName,
  );

  console.log({ 'hashed user': userWithPasswordHash });
  if (!userWithPasswordHash) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }

  // 3. hash the password
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
  // We are sure the user is authenticated

  // 4. Create a token
  console.log('Secret Token created - please proceed');
  const token = crypto.randomBytes(50).toString('base64');
  const csrfSecret = createCsrfSecret();
  // 5. Create the session record

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

  // 6. Send the new cookie in the headers
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
