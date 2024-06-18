import { StatusCodes } from 'http-status-codes';
import HandleError from '../utils/api-error';
import { isPasswordMatch } from '../utils/encrypt';
import userService from './user.service';
import { exclude } from '../utils/exclude';
import tokenService from './token.service';
import prisma from '../prisma-client';
import { TokenType } from '@prisma/client';

type LoginParams = {
  email: string;
  password: string;
};

const loginManual = async (params: LoginParams) => {
  const user = await userService.getUserByEmail(params.email, [
    'id',
    'email',
    'name',
    'role',
    'password',
  ]);
  if (
    user == null ||
    !(await isPasswordMatch(params.password, user.password))
  ) {
    console.log('ABCD');

    throw new HandleError(
      StatusCodes.UNAUTHORIZED,
      'Incorrect email or password'
    );
  }
  return exclude(user, ['password']);
};

const logout = async (refreshToken: string) => {
  const token = await prisma.token.findFirst({
    where: { token: refreshToken, type: TokenType.REFRESH, blacklisted: false },
  });
  if (token?.id == null) {
    throw new HandleError(StatusCodes.NOT_FOUND, 'Token not found');
  }
  return prisma.token.delete({ where: { id: token.id } });
};

export default { loginManual, logout };
