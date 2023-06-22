import Tokens from 'csrf';

const tokens = new Tokens();

export function createCsrfSecret() {
  return tokens.secretSync();
}

export function createTokenFromSecret(secret: string) {
  return tokens.create(secret);
}

export function validateTokenWithSecret(secret: string, token: string) {
  return tokens.verify(secret, token);
}
