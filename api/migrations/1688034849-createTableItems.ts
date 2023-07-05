import { Sql } from 'postgres';

export type UserItems = {
  id: number;
  userId: number;
  itemName: string;
  itemCategory: string;
  itemColor: string;
  itemDescription: string;
  itemState: string;
  itemPickup: string;
  itemLost: boolean;
  itemTimestamp: Date;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE items(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer,
    item_name varchar(255),
    item_category varchar(255),
    item_color varchar(255),
    item_description varchar(255),
    item_state varchar(255) ,
    item_pickup varchar(255),
    itemLost boolean,
    item_timestamp date ,
  )`;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE items
`;
}
