import express, { Router } from "express";
import authRouter from "./auth.router";
import docsRouter from "./docs.router";
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

const devRoutes: RouterList = [
  {
    path: "/docs",
    route: docsRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (process.env.ENVIRONMENT === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
