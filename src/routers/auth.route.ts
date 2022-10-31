import { Router } from "express";
import { AuthControlller } from "../controllers/auth.controller";

const route = Router();
const AuthRoutes = (app: Router) => {
  const auth = new AuthControlller();
  app.use("/auth", route);
  route.post("/login", auth.login);
};

export default AuthRoutes;
