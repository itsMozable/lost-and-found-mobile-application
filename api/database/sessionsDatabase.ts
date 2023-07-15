import { cache } from 'react';
import { Session } from '../migrations/1687369150-createTableSessions';
import { sql } from './connect';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export async function deleteSessionsBytokenAndCleanAllExpired(token: string) {
  await sql`
    DELETE FROM
      sessions
    WHERE
      token=${token}
    OR
      sessions.expiry_timestamp < NOW()
    `;
  return 'done';
}

export const createSession = cache(
  async (token: string, csrf_secret: string, userId: number) => {
    const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (token, csrf_secret, user_id)
    VALUES
      (${token},${csrf_secret},${userId})
    RETURNING
      id,
      token,
      csrf_secret,
      user_id
    `;

    await deleteExpiredSessions();

    return session;
  },
);

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});

export const getValidSessionByToken = cache(async (token: string) => {
  const [session] = await sql<
    { id: number; token: string; csrfSecret: string; userId: number }[]
  >`
    SELECT
      sessions.id,
      sessions.token,
      sessions.csrf_secret,
      sessions.user_id
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;

  return session;
});
