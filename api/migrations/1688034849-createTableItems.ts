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
  CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer NOT NULL UNIQUE,
    itemName varchar(255) NOT NULL,
    itemCategory varchar(255) NOT NULL,
    itemColor varchar(255) NOT NULL,
    itemLost boolean NOT NULL,
    itemFound boolean NOT NULL,
    itemLostFoundDate date NOT NULL,
    itemDescription varchar(255) NOT NULL,
    itemImage varchar(255) NOT NULL
  )`;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
`;
}

/* INSERT INTO users (user_name, password_hash, user_first_name, user_middle_name, user_last_name, user_addr_street, user_addr_house_no, user_post_code, user_location_city, user_email)  VALUES ('admin','admin','admin','admin','admin','admin','admin','admin','admin','admin@admin'); */
