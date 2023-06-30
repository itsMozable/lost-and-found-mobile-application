import 'server-only';
import { config } from 'dotenv';
// import { headers } from 'next/headers';
import postgres from 'postgres'; // , { Sql }

config();

export const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

// Alternative

/* declare module globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres({
      host: process.env.POSTGRES_HOST || process.env.PG_HOST,
      username: process.env.POSTGRES_USER || process.env.PGUSERNAME,
      password: process.env.POSTGRES_PASSWORD || process.env.PGPASSWORD,
      database: process.env.POSTGRES_DATABASE || process.env.PGDATABASE,
      ssl: !!process.env.POSTGRES_URL,
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }

  return ((
    ...sqlParameters: Parameters<typeof globalThis.postgresSqlClient>
  ) => {
    headers();
    return globalThis.postgresSqlClient(...sqlParameters);
  }) as typeof globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
 */
