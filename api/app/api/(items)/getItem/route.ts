import { cache } from 'react';
import { sql } from '../../../../database/connect';
import { UserItems } from '../../../../migrations/1688034849-createTableItems';

export const getItemsByCategoryAndState = cache(
  async (itemCategory: string, itemState: string) => {
    const [items] = await sql<UserItems[]>`
    SELECT
      item_category,
      item_name,
      item_color,
      item_description,
      item_state,
      item_pickup,

    FROM
      useritems
    WHERE
      items.item_state = ${itemState} AND items.item_category = ${itemCategory}
 `;
    console.log(items);

    return items;
  },
);
