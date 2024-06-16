import express, { Router, Express, Request, Response } from "express";
import authController from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/register", authController.register);

router.post("/refresh-token", (req: Request, res: Response) => {
  return res.status(200).json({ message: "OI" });
});

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export default router;
