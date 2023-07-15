import 'server-only';
import { config } from 'dotenv';
import postgres from 'postgres';

config();

export const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
