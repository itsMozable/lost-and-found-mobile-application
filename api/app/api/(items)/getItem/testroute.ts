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

  const result = addItemFilterSchema.safeParse(body);
  console.log(result);

  if (!result.success) {
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
    return NextResponse.json(
      {
        error: 'Error creating the new item List',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: newItemList });
}
