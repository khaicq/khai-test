import { Router } from "express";
import path from "path";

import {
  isAuthenticated,
  notAuthenticated,
} from "../middlewares/auth-social.middleware";

const route = Router();
const PublicRoutes = (app: Router) => {
  app.use("/", route);

  route.get("/login", notAuthenticated, (req, res) => {
    res.render("user/login/social-login");
  });
  route.get("/profile", isAuthenticated, (req, res) => {
    const user = {
      name: (req.user as any)?.name,
      email: (req.user as any)?.emails && (req.user as any)?.emails[0]?.value,
      id: (req.user as any)?.id,
      photo: (req.user as any)?.photos && (req.user as any)?.photos[0]?.value,
    };

    res.render("user/profile/profile", { user });
  });

  route.get("user/login/log-in-failed", (req, res) => {
    res.sendFile(path.join("log-in-failed"));
  });
};

export default PublicRoutes;
