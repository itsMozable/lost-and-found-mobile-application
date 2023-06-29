import { Sql } from 'postgres';

export type UserItems = {
  id: number;
  userId: number;
  itemName: string;
  itemCategory: string;
  itemColor: string;
  itemLost: boolean;
  itemFound: boolean;
  itemLostFoundDate: Date;
  itemDescription: string;
  itemImage: string;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE userItems(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer,
    itemName varchar(255),
    itemCategory varchar(255),
    itemColor varchar(255),
    itemLost boolean,
    itemFound boolean,
    itemLostFoundDate date ,
    itemDescription varchar(255) ,
    itemImage varchar(255)
  )`;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE userItems
`;
}
