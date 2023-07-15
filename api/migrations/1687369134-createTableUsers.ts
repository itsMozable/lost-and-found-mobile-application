import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  addrStreet: string;
  addrHouseNo: string;
  postCode: string;
  locationCity: string;
  email: string;
  passwordHash: string;
};

export type UserLogin = {
  id: number;
  userName: string;
  // passwordHash: string;
};

export type updateUser = {
  userName: string;
  firstName: string;
  lastName: string;
  addrStreet: string;
  addrHouseNo: string;
  postCode: string;
  locationCity: string;
  email: string;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name varchar(50) NOT NULL UNIQUE,
    user_first_name varchar(80)NOT NULL,
    user_last_name varchar(80)NOT NULL,
    user_addr_street varchar(80)NOT NULL,
    user_addr_house_no varchar(80)NOT NULL,
    user_post_code varchar(8)NOT NULL,
    user_location_city varchar(30)NOT NULL,
    user_email varchar(80)NOT NULL UNIQUE,
    password_hash varchar(70) NOT NULL
  )`;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
`;
}

/* INSERT INTO users (user_name, password_hash, user_first_name,user_last_name, user_addr_street, user_addr_house_no, user_post_code, user_location_city, user_email)  VALUES ('admin','admin','admin','admin','admin','admin','admin','admin','admin','admin@admin'); */
