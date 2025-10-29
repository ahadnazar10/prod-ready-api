import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

const SALT_ROUNDS = 10;

// hash password
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// compare password
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// generate JWTs
export function generateAccessToken(payload) {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}
