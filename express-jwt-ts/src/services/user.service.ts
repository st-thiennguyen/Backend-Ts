import { Role, User } from "@prisma/client";
import prisma from "../prisma-client";
import { encryptPassword } from "../utils/encrypt";
import HandleError from "../utils/api-error";
import httpStatus from "http-status";

type CreateAccountParams = {
  email: string;
  password: string;
  name: string;
  role: Role;
};

const createAccount = async (params: CreateAccountParams): Promise<User> => {
  if (await getUserByEmail(params.email)) {
    throw new HandleError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return prisma.user.create({
    data: { ...params, password: await encryptPassword(params.password) },
  });
};

const getUserByEmail = async <Key extends keyof User>(
  email: string,
  selects: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "createdAt",
    "updatedAt",
    "isVerified",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: selects.reduce(
      (key, value) => ({ ...key, [value]: true, email: true }),
      {}
    ),
  }) as Promise<Pick<User, Key> | null>;
};

const getUserById = async <Key extends keyof User>(
  id: number,
  selects: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "createdAt",
    "updatedAt",
    "isVerified",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: selects.reduce(
      (key, value) => ({ ...key, [value]: true, email: true }),
      {}
    ),
  }) as Promise<Pick<User, Key> | null>;
};

export default { createAccount, getUserByEmail, getUserById };
