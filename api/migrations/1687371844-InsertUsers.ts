import { Sql } from 'postgres';

export const logInData = [
  { id: 1, userName: 'admin', passwordHash: 'admin' },
  { id: 2, userName: 'testuser1', passwordHash: 'testuser1' },
];

export async function up(sql: Sql) {
  for (const testUsers of logInData) {
    await sql`
    INSERT INTO users
      (id, user_name, password_hash )
    VALUES
      (${testUsers.userName}, ${testUsers.passwordHash})
  `;
  }
}

export async function down(sql: Sql) {
  for (const testUsers of logInData) {
    await sql`
      DELETE FROM users WHERE id = ${testUsers.id}
  `;
  }
}
