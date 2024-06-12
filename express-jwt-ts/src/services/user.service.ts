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

const getUserByEmail = async <T extends keyof User>(
  email: string,
  selects: T[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "createdAt",
    "updatedAt",
    "isVerified",
  ] as T[]
): Promise<Pick<User, T> | null> => {
  return prisma.user.findUnique({
    where: { email: email },
    select: selects.reduce(
      (object, select) => ({ ...object, [select]: true }),
      {}
    ),
  }) as Promise<Pick<User, T> | null>;
};

export default { createAccount };
