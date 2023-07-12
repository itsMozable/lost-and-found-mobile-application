import { it } from 'node:test';
import { cache } from 'react';
import { UserItems } from '../migrations/1688034849-createTableItems';
import { sql } from './connect';

export const getItemsByCategoryAndState = cache(
  async (itemCategory: string, itemState: string) => {
    const [items] = await sql<UserItems[]>`
    SELECT
      user_id,
      item_category,
      item_name,
      item_color,
      item_description,
      item_state,
      item_pickup,
      item_timestamp

    FROM
      items
    WHERE
      items.item_state = ${itemState} AND items.item_category = ${itemCategory}
 `;

    return items;
  },
);

// add new items to database
export const addItem = cache(
  async (
    userId: number,
    itemCategory: string,
    itemName: string,
    itemColor: string,
    itemDescription: string,
    itemState: string,
    itemPickup: string,
    itemTimestamp: Date,
  ) => {
    console.log(itemName);

    const [item] = await sql<UserItems[]>`
    INSERT INTO items
      (user_id,
      item_category,
      item_name,
      item_color,
      item_description,
      item_state,
      item_pickup,
      item_timestamp)

    VALUES(
    ${userId},
     ${itemCategory},
    ${itemName},
    ${itemColor},
    ${itemDescription},
    ${itemState},
    ${itemPickup},
    ${itemTimestamp}
    )


    RETURNING

      user_id,
      item_category,
      item_name,
      item_color,
      item_description,
      item_state,
      item_pickup,
      item_lost,
      item_timestamp
 `;

    return item;
  },
);
