/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getItemsByCategoryAndState } from '../../../../database/itemsDatabase';

type Error = {
  error: string;
};

export type FilterResponseBodyPost =
  | {
      item: {
        itemCategory: string;
        itemState: string;
      };
    }
  | Error;

const addItemFilterSchema = z.object({
  itemCategory: z.string().min(1),
  itemState: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<FilterResponseBodyPost>> {
  const body = await request.json();

  console.log(body);

  // 1. get the credentials from the body
  const result = addItemFilterSchema.safeParse(body);
  console.log(result);
  // 2. verify the user data and check that the name is not taken
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

  console.log({ 'check itemCategory': result.data.itemCategory });

  const newItemList = await getItemsByCategoryAndState(
    result.data.itemCategory,
    result.data.itemState,
  );

  console.log(newItemList);

  if (!newItemList) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'Error creating the new item List',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: newItemList });
}
