import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/sessionsDatabase';
import { createUser, getUserByUsername } from '../../../database/usersDatabase';
import { User } from '../../../migrations/1687369134-createTableUsers';
import { secureCookieOptions } from '../../../utils/cookies';

type Error = {
  error: string;
};

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const addUserSchema = z.object({
  userName: z.string().min(1),
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
  addrStreet: z.string().min(1),
  addrHouseNo: z.string().min(1),
  postCode: z.string().min(1),
  locationCity: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  console.log(body);

  // 1. get the credentials from the body
  const result = addUserSchema.safeParse(body);

  // 2. verify the user data and check that the name is not taken
  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: `Test ${result}`,
      },
      { status: 400 },
    );
  }

  if (await getUserByUsername(result.data.userName)) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'username is already used',
      },
      { status: 406 },
    );
  }

  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 10);

  // 4. store the credentials in the db
  const newUser = await createUser(result.data.userName, passwordHash);

  if (!newUser) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  // We are sure the user is authenticated

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record

  const session = await createSession(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 7. Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 7. return the new user to the client
  return NextResponse.json({ user: newUser });
}
