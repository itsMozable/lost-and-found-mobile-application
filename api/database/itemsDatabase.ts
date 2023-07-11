import { cache } from 'react';
import { UserItems } from '../migrations/1688034849-createTableItems';
import { sql } from './connect';

export const getItemsByCategoryAndState = cache(
  async (itemCategory: string, itemState: string) => {
    const [items] = await sql<UserItems[]>`
    SELECT
      id,
      item_name,
      item_color,
      item_description,
      item_state,
      item_pickup,
      itemLost,
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
    itemName: string,
    itemCategory: string,
    itemColor: string,
    itemDescription: string,
    itemState: string,
    itemPickup: string,
    itemLost: boolean,
    itemTimestamp: Date,
  ) => {
    console.log(itemName);
    const timestamp = new Date();

    const [item] = await sql<UserItems[]>`
    INSERT INTO items
      (user_id,
      item_name,
      item_category,
      item_color,
      item_description,
      item_state,
      item_pickup,
      itemLost,
      item_timestamp)

    VALUES(
    ${userId},
    ${itemName},
    ${itemCategory},
    ${itemColor},
    ${itemDescription},
    ${itemState},
    ${itemPickup},
    ${itemLost},
    ${timestamp})


    RETURNING
      id,
      item_name,
      item_category,
      item_color,
      item_description,
      item_state,
      item_pickup,
      itemLost,
      item_timestamp

 `;

    return item;
  },
);

// function not included by Jose but by pocket offers
/* export async function updateUserById(userId: number, userData: User) {
  await sql`
    UPDATE users
    SET
        user_first_name = ${userData.userFirstName},
        user_last_name = ${userData.userLastName},
        user_addr_street = ${userData.userAddrStreet},
        user_addr_house_no = ${userData.userAddrHouseNo},
        user_post_code = ${userData.userPostCode},
        user_location_city = ${userData.userLocationCity},
        user_email = ${userData.userEmail},
  	WHERE
        id=${userId}
    `;
  return `User Log / Data of user ${userId} has been updated successfully `;
} */
