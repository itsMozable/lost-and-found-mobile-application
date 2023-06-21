import config from 'next/config';
import postgres from 'postgres';

config();

export const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
