import { Token, TokenType, User } from "@prisma/client";
import moment, { Moment } from "moment";
import jwt from "jsonwebtoken";
import prisma from "../prisma-client";
import { AuthTokenResponse } from "../types/AuthToken";

const generateToken = (userId: number, expires: Moment, type: TokenType) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    expires: expires.unix(),
    type,
  };

  if (process.env.JWT_SERECT == null) {
    throw new Error("Serect key not found");
  }

  return jwt.sign(payload, `${process.env.JWT_SERECT}`);
};

const saveToken = (
  token: string,
  userId: number,
  expires: Moment,
  type: TokenType,
  blacklisted = false
): Promise<Token> => {
  return prisma.token.create({
    data: {
      token,
      userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
};

const generateAuthTokens = async (
  userId: number
): Promise<AuthTokenResponse> => {
  const accessExpires = moment().add(process.env.JWT_ACCESS_EXPIRES, "day");
  const accessToken = generateToken(userId, accessExpires, TokenType.ACCESS);

  const refreshExpires = moment().add(process.env.JWT_REFRESH_EXPIRES, "day");
  const refreshToken = generateToken(userId, refreshExpires, TokenType.REFRESH);

  await saveToken(refreshToken, userId, refreshExpires, TokenType.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshExpires.toDate(),
    },
  };
};

export default { generateToken, saveToken, generateAuthTokens };
