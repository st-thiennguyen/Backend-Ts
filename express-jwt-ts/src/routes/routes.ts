import express, { Router } from "express";
import authRouter from "./auth.router";
const router = express.Router();

type RouterList = {
  path: string;
  route: Router;
}[];

const defaultRoutes: RouterList = [
  {
    path: "/auth",
    route: authRouter,
  },
];

const devRoutes: RouterList = [...defaultRoutes];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
