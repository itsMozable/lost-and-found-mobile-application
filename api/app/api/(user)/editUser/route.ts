/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserById } from '../../../../database/usersDatabase';
import { updateUser } from '../../../../migrations/1687369134-createTableUsers';

type Error = {
  error: string;
};

const editUserSchema = z.object({
  userName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  addrStreet: z.string().min(1),
  addrHouseNo: z.string().min(1),
  postCode: z.string().min(1),
  locationCity: z.string().min(1),
  email: z.string().min(1),
});

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const result = editUserSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error.issues);
    return NextResponse.json(
      {
        error: result.error.issues,
      },
      { status: 400 },
    );
  }

  const userData: updateUser = result.data;

  const updatedPosition = await updateUserById(1, userData);

  console.log(updatedPosition);

  return NextResponse.json({
    isEdited: true,
  });
}
