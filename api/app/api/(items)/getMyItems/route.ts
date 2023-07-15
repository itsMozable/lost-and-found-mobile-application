/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getMyItems } from '../../../../database/itemsDatabase';
import { getUserByUsername } from '../../../../database/usersDatabase';

type Error = {
  error: string;
};

export type ItemsResponseBodyPost =
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

const userFilterSchema = z.object({
  getDetails: z.string().min(1),
  userName: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = userFilterSchema.safeParse(body);
  console.log(result);

  if (!result.success) {
    // zod send you details about the error
    console.log(result.error);

    return NextResponse.json(
      {
        error: 'items weg',
      },
      { status: 400 },
    );
  }

  console.log({ 'check userName': result.data.userName });

  console.log('getting the id');
  const userCredentials = await getUserByUsername(result.data.userName);
  console.log(userCredentials);

  const myItems = await getMyItems(userCredentials.id);

  console.log(myItems);

  if (!myItems) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new item List',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: myItems });
}
