import { sql } from '../connect';

type UserLogData = {
  id: number;
  userName: string;
  passwordHash: string;
};

export type UserData = {
  userName: string;
  userFirstName: string;
  userMiddleName: string;
  userLastName: string;
  userAddrStreet: string;
  userAddrHouseNo: string;
  userPostCode: string;
  userLocationCity: string;
  userEmail: string;
};

export async function getUserByNameInclPasswordHash(userName: string) {
  const [user] = await sql<UserLogData[]>`
    SELECT
    id,
    user_name,
    password_hash
    FROM
      users
    WHERE
      user_name=${userName}
    `;
  return user;
}

export async function getUserDatabyId(userId: number) {
  const [user] = await sql<UserData[]>`
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

export async function getUserAndIdByName(userName: string) {
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
}

export async function createUser(userName: string, passwordHash: string) {
  const [user] = await sql<{ id: number; userName: string }[]>`
    INSERT INTO users
      (user_name, password_hash, ) /* first_Name, middle_name, last_name, addr_street, addr_house_no, post_code, location_city, email, */  /* oder reicht nur userName und passwort? */
    VALUES
      (${userName}, ${passwordHash})
    RETURNING
      id,
      user_name
    `;
  return user;
}

export async function updateUserById(userId: number, userData: UserData) {
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
