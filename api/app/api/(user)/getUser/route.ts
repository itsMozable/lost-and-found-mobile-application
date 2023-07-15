import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserByUsername,
  getUserDatabyId,
} from '../../../../database/usersDatabase';
import {
  User,
  UserLogin,
} from '../../../../migrations/1687369134-createTableUsers';

const getUserSchema = z.object({
  getDetails: z.string(),
  userName: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = getUserSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error.issues);
    return NextResponse.json(
      {
        error: result.error.issues,
      },
      { status: 400 },
    );
  }
  console.log(result);
  const credentials: UserLogin = await getUserByUsername(result.data.userName);
  const userData: User = await getUserDatabyId(credentials.id);

  return NextResponse.json({
    userData: userData,
  });
}
