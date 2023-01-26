import express, { Router, NextFunction } from "express";
import cors from "cors";
import ApiRoutes from "./src/routers";
import { environment } from "./src/environments/environment";
import passport from "passport";
import path from "path";
import session from "express-session";
import PublicRoutes from "./src/views/public.route";
import PassportLib from "./src/libs/passport";

const startSerser = () => {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));

  app.use("/upload", express.static(path.join(__dirname, "src", "uploads")));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "src", "views"));

  app.use(
    session({ resave: true, saveUninitialized: true, secret: "somesecret" })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  PassportLib(passport);

  app.use(`/api`, ApiRoutes());
  PublicRoutes(app);

  app.use((err: any, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  app.listen(environment.port, () => {
    console.log(`Server is running on port ${environment.port}`);
  });
};

startSerser();
