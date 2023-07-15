import { cache } from 'react';
import {
  updateUser,
  User,
  UserLogin,
} from '../migrations/1687369134-createTableUsers';
import { sql } from './connect';

type UserWithPasswordHash = UserLogin & {
  passwordHash: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (userName: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      id,
      user_name,
      password_hash
    FROM
      users
    WHERE
      users.user_name = ${userName}
 `;

    return user;
  },
);

// used for register to check if Username already exists
export const getUserByUsername = cache(async (userName: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      user_name
    FROM
      users
    WHERE
      users.user_name = ${userName}
 `;

  return user;
});

// used for register new user
export const createUser = cache(
  async (
    userName: string,
    firstName: string,
    lastName: string,
    addrStreet: string,
    addrHouseNo: string,
    postCode: string,
    locationCity: string,
    email: string,
    passwordHash: string,
  ) => {
    console.log(passwordHash);

    const [user] = await sql<User[]>`
    INSERT INTO users
      (user_name,
      user_first_name,
      user_last_name,
      user_addr_street,
      user_addr_house_no,
      user_post_code,
      user_location_city,
      user_email,
       password_hash)

    VALUES(
    ${userName},
    ${firstName},
    ${lastName},
    ${addrStreet},
    ${addrHouseNo},
    ${postCode},
    ${locationCity},
    ${email},
    ${passwordHash})

    RETURNING
      id,
      user_name,
      user_first_name,
      user_last_name,
      user_addr_street,
      user_addr_house_no,
      user_post_code,
      user_location_city,
      user_email
 `;

    return user;
  },
);

// not included in pocket offers but maybe necessary
export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.user_name
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});

// function not included by Jose but by pocket offers
export async function updateUserById(userId: number, userData: updateUser) {
  console.log(userId, 'Hollodrio');
  await sql`
    UPDATE users
    SET
        user_first_name = ${userData.firstName},
        user_last_name = ${userData.lastName},
        user_addr_street = ${userData.addrStreet},
        user_addr_house_no = ${userData.addrHouseNo},
        user_post_code = ${userData.postCode},
        user_location_city = ${userData.locationCity},
        user_email = ${userData.email}
  	WHERE
    id = ${userId}
    `;
  return `User Log / Data of user ${userId} has been updated successfully `;
}

// could be used for userprofil
export async function getUserDatabyId(userId: number) {
  const [user] = await sql<User[]>`
    SELECT
      user_name,
      user_first_name,
      user_last_name,
      user_addr_street,
      user_addr_house_no,
      user_post_code,
      user_location_city,
      user_email
    FROM
      users
    WHERE
    id = ${userId}
    `;
  return user;
}
