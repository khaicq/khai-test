import express, { Router, NextFunction } from "express";
import cors from "cors";
import useStatic from "./src/middlewares/use-static";
import ApiRoutes from "./src/routers";
import { environment } from "./src/environments/environment";

const startSerser = () => {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));

  useStatic(app);
  app.use(`/api`, ApiRoutes());

  app.listen(environment.port, () => {
    console.log(`Server is running in http://localhost:${environment.port}`);
  });
};

startSerser();
