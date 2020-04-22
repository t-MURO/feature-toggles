export const AUTH_COOKIE_NAME = "access_token";

export const API_AUTH_SECRET = process.env.FTMS_SECRET || "secret";

export const TOKEN_EXPIRY_TIME = 60 * 60 * 2; // 2h
// export const TOKEN_EXPIRY_TIME = 60; // 2h