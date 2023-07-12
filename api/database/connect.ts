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
