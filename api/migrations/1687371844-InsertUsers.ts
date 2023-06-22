import { Sql } from 'postgres';

export const logInData = [
  { id: 1, userName: 'admin', passwordHash: 'admin' },
  { id: 2, userName: 'testUser1', passwordHash: 'testUser1' },
];

export async function up(sql: Sql) {
  for (const testUsers of logInData) {
    await sql`
    INSERT INTO users
      (id, user_name, password_hash )
    VALUES
      (${testUsers.id}, ${testUsers.userName}, ${testUsers.passwordHash})
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
