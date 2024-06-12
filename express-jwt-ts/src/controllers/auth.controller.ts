import { Request, Response } from "express";
import userService from "../services/user.service";
import httpStatus from "http-status";
import HandleError from "../utils/api-error";

const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createAccount(req.body);
    res.status(httpStatus.OK).json({
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);

    throw new HandleError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Some things when wrong"
    );
  }
};

export default { register };
