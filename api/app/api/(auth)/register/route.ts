import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessionsDatabase';
import {
  createUser,
  getUserByUsername,
} from '../../../../database/usersDatabase';
import { User } from '../../../../migrations/1687369134-createTableUsers';
import { secureCookieOptions } from '../../../../utils/cookies';
import { createCsrfSecret } from '../../../../utils/csrf';

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

  const result = addUserSchema.safeParse(body);
  console.log(result);

  if (!result.success) {
    console.log(result.error);

    return NextResponse.json(
      {
        error: 'username or password missing*',
      },
      { status: 400 },
    );
  }

  console.log({ 'check username': result.data.userName });

  if (await getUserByUsername(result.data.userName)) {
    return NextResponse.json(
      {
        error: 'username is already used',
      },
      { status: 406 },
    );
  }

  const passwordHash = await bcrypt.hash(result.data.password, 10);

  const newUser = await createUser(
    result.data.userName,
    result.data.firstName,
    result.data.lastName,
    result.data.addrStreet,
    result.data.addrHouseNo,
    result.data.postCode,
    result.data.locationCity,
    result.data.email,
    passwordHash,
  );
  console.log(newUser);

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  const token = crypto.randomBytes(50).toString('base64');
  console.log({ token: token });
  const csrfSecret = createCsrfSecret();
  console.log({ secret: csrfSecret });

  const session = await createSession(token, csrfSecret, newUser.id);

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

  return NextResponse.json({ user: newUser });
}
