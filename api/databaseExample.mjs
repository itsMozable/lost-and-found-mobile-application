import postgres from 'postgres';

const sql = postgres(
  'postgres://tattoomozi:tattoomozi@localhost:5432/final_project',
);

console.log(await sql`SELECT * FROM users`);

await sql.end();
