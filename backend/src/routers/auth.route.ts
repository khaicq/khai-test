import { Router } from "express";
import { AuthControlller } from "../controllers/auth.controller";
import passport from "passport";
import { loginValidation } from "../middlewares";
import { environment } from "../environments/environment";

const router = Router();
const AuthRoutes = (app: Router) => {
  const auth = new AuthControlller();
  app.use("/auth", router);
  router.post("/login", loginValidation, auth.login);
  router.get("/refresh", auth.refreshToken);

  router.get(
    "/facebook-login",
    passport.authenticate("facebook", {
      scope: ["email"],
    })
  );
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: environment.clientUrl + "/home?",
      failureRedirect: "/log-in-failed",
    })
  );

  router.get(
    "/google-login",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: environment.clientUrl + "/home?",
      failureRedirect: "/log-in-failed",
    })
  );

  router.get("/logout", (req, res) => {
    req.logout(() => {
      console.log("User has been logout");
      res.status(200).json();
    });
  });
};

export default AuthRoutes;
