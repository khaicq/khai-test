import { Router } from "express";
import { AuthControlller } from "../controllers/auth.controller";
import passport from "passport";
import { loginValidation } from "../middlewares";

const router = Router();
const AuthRoutes = (app: Router) => {
  const auth = new AuthControlller();
  app.use("/auth", router);
  router.post("/login", loginValidation, auth.login);

  router.get(
    "/facebook-login",
    passport.authenticate("facebook", {
      scope: ["email"],
    })
  );
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile",
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
      successRedirect: "/profile",
      failureRedirect: "/log-in-failed",
    })
  );

  router.get("/logout", (req, res) => {
    req.logout(() => {
      console.log("User has been logout");
      res.redirect("/login");
    });
  });
};

export default AuthRoutes;
