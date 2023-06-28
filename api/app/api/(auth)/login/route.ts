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

console.log('Hello');
type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: UserLogin;
    }
  | Error;

const userLoginSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});

// special code snippet
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(req: NextRequest) {
  return await NextResponse.json({}, { headers: corsHeaders });
}
// special code snippet

export async function POST(
  request: NextRequest,
  // only for Jose not for pocket-offer
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  console.log(body);
  console.log('Check User Schema');

  // 1. get the credentials from the body
  const result = userLoginSchema.safeParse(body);
  console.log(result);
  // 2. verify the user data and check that the name is not taken
  if (!result.success) {
    // zod send you details about the error
    console.log(result.error);

    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      { status: 400 },
    );
  }

  console.log(result.data);
  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.userName,
  );
  console.log(userWithPasswordHash);
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

  // We are sure the user is authenticated

  // 4. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 5. Create the session record

  const csrfSecret = createCsrfSecret();
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

  return NextResponse.json(
    {
      user: {
        id: userWithPasswordHash.id,
        userName: userWithPasswordHash.userName,
      },
    },
    {
      status: 200,
    },
  );
}
