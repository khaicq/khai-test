import { Router } from "express";
import path from "path";
import { authenticateToken } from "../middlewares";

const route = Router();
const PublicRoutes = (app: Router) => {
  app.use("/", route);

  route.get("/login", (req, res) => {
    res.render("user/login/login");
  });
  route.get("/profile", authenticateToken, (req, res) => {
    console.log("_____________________________________________________");
    console.log(req.user);
    res.render("user/profile/profile", { user: req.user });
  });
  route.get("/", (req, res) => {
    res.status(200).json({ user: req.user });
  });

  route.get("user/login/log-in-failed", (req, res) => {
    res.sendFile(path.join("log-in-failed"));
  });
};

export default PublicRoutes;
