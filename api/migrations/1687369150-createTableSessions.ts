export async function up(sql: any) {
  await sql`
  CREATE TABLE sessions(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    token varchar(100) NOT NULL UNIQUE,
    csrf_secret varchar(150) NOT NULL UNIQUE,
    expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
    user_id integer REFERENCES users(id) ON DELETE CASCADE
  )`;
}

export async function down(sql: any) {
  await sql`
  DROP TABLE sessions
`;
}
