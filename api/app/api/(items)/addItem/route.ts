import { cookies } from 'next/headers';
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addItem } from '../../../../database/itemsDatabase';
import {
  getItemsByCategoryAndState,
  getValidSessionByToken,
} from '../../../../database/sessionsDatabase';
import { validateTokenWithSecret } from '../../../../utils/csrf';

type Error = {
  error: string;
};

export type RegisterResponseBodyPost =
  | {
      user: Item;
    }
  | Error;

const addItemSchema = z.object({
  itemCategory: z.string().min(1),
  itemName: z.string().min(1),
  itemColor: z.string().min(1),
  itemDescription: z.string().min(1),
  itemState: z.string().min(1),
  itemPickup: z.string().min(1),
  itemLost: z.boolean(),
  itemTimestamp: z.date(),
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
        error: 'username or password missing*',
      },
      { status: 400 },
    );
  }

  console.log({ 'check username': result.data.itemName});

  if (await getItemsByCategoryAndState(result.data.itemName)) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'username is already used',
      },
      { status: 406 },
    );
  }

  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 10)
    ;

  // 4. store the credentials in the db
  const newUser = await addItem(

    result.data.itemCategory,
    result.data.itemName,
    result.data.itemColor,
    result.data.itemDescription,
    result.data.itemState,
    result.data.itemPickup,
    result.data.itemLost,
    result.data.itemTimestamp,
  );
  console.log(newUser);

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

  // We are sure the user is authenticated

  // 5. Create a token (changed to 50 due to Postgres error)
  const token = crypto.randomBytes(50).toString('base64');
  console.log({ token: token });
  const csrfSecret = createCsrfSecret();
  console.log({ secret: csrfSecret });
  // 6. Create the session record
  const session = await createSession(token, csrfSecret, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 7. Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 7. return the new user to the client
  return NextResponse.json({ user: newUser });
}
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
    session.itemId,
    result.data.itemCategory,
    result.data.itemName,
    result.data.itemColor,
    result.data.itemDescription,
    result.data.itemState,
    result.data.itemPickup,
    result.data.itemLost,
    result.data.itemTimestamp,

  );

  console.log(
    `Template Log / Item ${result.data.itemName} has been successfully added for User ${session.userId}`,
  );

  return NextResponse.json({
    isAdded: true,
    newTemplateItemRow: addedItem.id,
  });
}
