/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addItem } from '../../../../database/itemsDatabase';
import { getValidSessionByToken } from '../../../../database/sessionsDatabase';
import { validateTokenWithSecret } from '../../../../utils/csrf';

const addItemSchema = z.object({
  itemName: z.string().min(1),
  itemCategory: z.string().min(1),
  itemColor: z.string().min(1),
  itemDescription: z.string().min(1),
  itemState: z.string().min(1),
  itemPickup: z.string().min(1),
  itemLost: z.boolean(),
});

export async function POST(request: NextRequest) {
  const getKeys = await request.headers.get('Authorization');
  const body = await request.json();
  const result = addItemSchema.safeParse(body);

  let token;
  let csrfToken;

  if (getKeys) {
    if (JSON.parse(getKeys).keyA && JSON.parse(getKeys).keyB) {
      token = JSON.parse(getKeys).keyA;
      csrfToken = JSON.parse(getKeys).keyB;
    } else {
      console.log(
        'Template Log / Creation denied: missing at least one key in auth request header',
      );
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
  } else {
    console.log('Template Log  / Creation denied: Auth request header empty');
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

  const session = await getValidSessionByToken(token);

  if (!session) {
    console.log('Template Log  / Creation denied: invalid token');
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

  const isCsrfValid = validateTokenWithSecret(session.csrfSecret, csrfToken);

  if (!isCsrfValid) {
    console.log('Template Log  / Creation denied: invalid csrf token');
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

  const addedItem = await addItem(
    session.userId,
    result.data.itemName,
    result.data.itemCategory,
    result.data.itemColor,
    result.data.itemDescription,
    result.data.itemState,
    result.data.itemPickup,
    true,
  );

  console.log(
    `Template Log / Item ${result.data.itemName} has been successfully added for User ${session.userId}`,
  );

  return NextResponse.json({
    isAdded: true,
    newTemplateItemRow: addedItem.id,
  });
}
