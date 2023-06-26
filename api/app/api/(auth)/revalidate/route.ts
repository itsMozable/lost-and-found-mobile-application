/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { getValidSessionByToken } from '../../../../database/sessionsDatabase';
import { createTokenFromSecret } from '../../../../utils/csrf';

export async function POST(request: NextRequest) {
  const token = await request.headers.get('Authorization');

  if (!token) {
    console.log('Revalidation Log / Denied: missing token');
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Denied: missing token',
          },
        ],
      },
      { status: 400 },
    );
  }

  const session = await getValidSessionByToken(token);

  if (!session) {
    console.log('Revalidation Log / Denied: invalid token');
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Denied: invalid token',
          },
        ],
      },
      { status: 401 },
    );
  }

  console.log(
    `Revalidation Log / Session Id ${session.id} successfully revalidated`,
  );

  const cToken = createTokenFromSecret(session.csrfSecret);

  return NextResponse.json({
    validation: { cToken: cToken },
  });
}
