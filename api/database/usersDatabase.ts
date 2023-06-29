import { cache } from 'react';
import { User, UserLogin } from '../migrations/1687369134-createTableUsers';
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
    userFirstName: string,
    userMiddleName: string,
    userLastName: string,
    userAddrStreet: string,
    userAddrHouseNo: string,
    userPostCode: string,
    userLocationCity: string,
    userEmail: string,
    passwordHash: string,
  ) => {
    console.log(passwordHash);

    const [user] = await sql<User[]>`
    INSERT INTO users
      (user_name,
      user_first_name,
      user_middle_name,
      user_last_name,
      user_addr_street,
      user_addr_house_no,
      user_post_code,
       user_location_city,
       user_email,
       password_hash)

    VALUES(
    ${userName},
    ${userFirstName},
    ${userMiddleName},
    ${userLastName},
    ${userAddrStreet},
    ${userAddrHouseNo},
    ${userPostCode},
    ${userLocationCity},
    ${userEmail},
    ${passwordHash})

    RETURNING
      id,
      user_name
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
export async function updateUserById(userId: number, userData: User) {
  await sql`
    UPDATE users
    SET
        user_first_name = ${userData.userFirstName},
        user_middle_name = ${userData.userMiddleName},
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
}

// could be used for userprofil
export async function getUserDatabyId(userId: number) {
  const [user] = await sql<User[]>`
    SELECT
      user_first_name,
      user_middle_name,
      user_last_name,
      user_addr_street,
      user_addr_house_no,
      user_post_code,
      user_location_city,
      user_email,
    FROM
      users
    WHERE
      id=${userId}
    `;
  return user;
}

/* export async function getUserAndIdByName(userName: string) {
  const [user] = await sql<{ id: number; userName: string }[]>`
    SELECT
      id,
      user_name
    FROM
      users
    WHERE
      user_name=${userName}
    `;
  return user;
} */
