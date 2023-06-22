import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name varchar(50) NOT NULL UNIQUE,
    password_hash varchar(70) NOT NULL,
    user_first_name varchar(80)NOT NULL,
    user_middle_name varchar(80)NOT NULL,
    user_last_name varchar(80)NOT NULL,
    user_addr_street varchar(80)NOT NULL,
    user_addr_house_no varchar(80)NOT NULL,
    user_post_code varchar(8)NOT NULL,
    user_location_city varchar(30)NOT NULL,
    user_email varchar(80)NOT NULL UNIQUE
  )`;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
`;
}
