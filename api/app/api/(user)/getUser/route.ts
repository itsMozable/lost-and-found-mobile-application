import { cookies } from 'next/headers';
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessionsDatabase';
import { getUserDatabyId } from '../../../../database/usersDatabase';
import { User } from '../../../../migrations/1687369134-createTableUsers';
import { validateTokenWithSecret } from '../../../../utils/csrf';

const getUserSchema = z.object({
  getDetails: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = getUserSchema.safeParse(body);

  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    console.log('User Log / Get Request Denied: invalid token');
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Denied: failed authentication',
          },
        ],
      },
      { status: 401 },
    );
  }

  const isCsrfValid = await validateTokenWithSecret(
    session.csrfSecret,
    session.token,
  );

  if (!isCsrfValid) {
    console.log('User Log / Get Request Denied: invalid csrf token');
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Denied: failed authentication',
          },
        ],
      },
      { status: 401 },
    );
  }

  if (!result.success) {
    console.log(result.error.issues);
    return NextResponse.json(
      {
        error: result.error.issues,
      },
      { status: 400 },
    );
  }

  const userData: User = await getUserDatabyId(session.userId);

  return NextResponse.json({
    userData: userData,
  });
}
