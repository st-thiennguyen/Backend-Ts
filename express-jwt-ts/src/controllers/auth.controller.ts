import { Request, Response } from "express";
import userService from "../services/user.service";
import httpStatus from "http-status";
import { handleErrorResponse } from "../utils/error-response";
import { StatusCodes } from "http-status-codes";
import { exclude } from "../utils/exclude";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";

const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createAccount(req.body);
    res.status(httpStatus.OK).json({
      message: "Register successfully",
      data: exclude(user, ["password", "id", "isVerified"]),
    });
  } catch (error) {
    console.error(error);
    handleErrorResponse(StatusCodes.CONFLICT, "Can't not create account", res);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.loginManual(req.body);
    const tokens = await tokenService.generateAuthTokens(user.id);
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Login Successfully", data: user, tokens: tokens });
  } catch (error) {
    console.error(error);
    handleErrorResponse(StatusCodes.UNAUTHORIZED, "Login failure", res);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
    handleErrorResponse(StatusCodes.UNAUTHORIZED, "", res);
  }
};

export default { register, login, logout };
