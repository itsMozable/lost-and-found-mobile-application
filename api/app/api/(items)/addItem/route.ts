/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addItem } from '../../../../database/itemsDatabase';
import { getUserByUsername } from '../../../../database/usersDatabase';

type Error = {
  error: string;
};

export type RegisterResponseBodyPost =
  | {
      item: {
        itemCategory: string;
        itemName: string;
        itemColor: string;
        itemDescription: string;
        itemState: string;
        itemPickup: string;
      };
    }
  | Error;

const addItemSchema = z.object({
  itemCategory: z.string().min(1),
  itemName: z.string().min(1),
  itemColor: z.string().min(1),
  itemDescription: z.string().min(1),
  itemState: z.string().min(1),
  itemPickup: z.string().min(1),
  userName: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  console.log(body);

  // 1. get the credentials from the body
  const result = addItemSchema.safeParse(body);
  console.log(result);
  // 2. verify the user data and check that the name is not taken
  if (!result.success) {
    // zod send you details about the error
    console.log(result.error);

    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      { status: 400 },
    );
  }

  console.log({ 'check itemname': result.data.itemName });
  const itemTimestamp = new Date();

  console.log('getting the id');
  const userCredentials = await getUserByUsername(result.data.userName);
  console.log(userCredentials);

  console.log({ itemTimestamp });
  // 4. store the credentials in the db
  const newItem = await addItem(
    userCredentials.id,
    result.data.itemCategory,
    result.data.itemName,
    result.data.itemColor,
    result.data.itemDescription,
    result.data.itemState,
    result.data.itemPickup,
    itemTimestamp,
  );

  console.log(newItem);

  if (!newItem) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new item',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: newItem });
}
