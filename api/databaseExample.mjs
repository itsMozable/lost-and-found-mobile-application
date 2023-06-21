import postgres from 'postgres';

const sql = postgres();

console.log(await sql`SELECT * FROM users`);
