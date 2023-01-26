import { Router } from "express";
import AuthRoutes from "./auth.route";
import UserRoutes from "./user.route";

const ApiRoutes = () => {
  const app = Router();
  UserRoutes(app);
  AuthRoutes(app);

  return app;
};

export default ApiRoutes;
