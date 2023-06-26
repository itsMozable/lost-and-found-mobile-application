/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import {
  deleteSessionsBytokenAndCleanAllExpired,
  getValidSessionByToken,
} from '../../../../database/sessionsDatabase';

export async function POST(request: NextRequest) {
  const token = await request.headers.get('Authorization');

  if (!token) {
    console.log('Logout Log / Error: missing token');
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Error: missing token',
          },
        ],
      },
      { status: 400 },
    );
  }

  const session = await getValidSessionByToken(token);

  if (!session) {
    console.log('Logout Log / Error: invalid token');
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Error: invalid token',
          },
        ],
      },
      { status: 401 },
    );
  }

  const isCleared = await deleteSessionsBytokenAndCleanAllExpired(token);

  if (isCleared) {
    console.log(
      `Logout Log / Session Id ${session.id} successfully cleaned up`,
    );
  }

  return NextResponse.json({
    message: { isServerSessionCleaned: true },
  });

  // console.log(
  //   `Logout Log / Session Id ${cleanedId.id} successfully cleaned up`,
  // );
}
