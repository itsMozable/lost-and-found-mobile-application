import { sql } from '../connect';

type Session = {
  id: number;
  csrfSecret: string;
  token: string;
  userId: number;
};

export async function deleteSessionsByUserId(userId: number) {
  await sql`
    DELETE FROM
      sessions
    WHERE
      user_id=${userId}
    `;
  return `Session for User Id ${userId} cleaned up`;
}

export async function deleteSessionsByTokenAndCleanAllExpired(token: string) {
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

export async function createSession(
  token: string,
  csrf_secret: string,
  userId: number,
) {
  const [session] = await sql<{ id: number; token: string }[]>`
    INSERT INTO sessions
      (token, csrf_secret, user_id)
    VALUES
      (${token},${csrf_secret},${userId})
    RETURNING
      id,
      token
    `;
  return session;
}

export async function getValidSessionByToken(token: string) {
  const [session] = await sql<Session[]>`
  SELECT
    sessions.id,
    sessions.csrf_secret,
    sessions.token,
    sessions.user_id
  FROM
    sessions
  WHERE
    sessions.token = ${token}
  AND
    sessions.expiry_timestamp > NOW()
  `;
  return session;
}
