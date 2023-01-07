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

  const handleThread = (req: any, res: any) => {
    console.log("!!!!!!!!!!!!!");
    let s = 0;
    const datapending = [];
    for (let i = 0; i < 10; i++) {
      datapending.push(
        promise(i, i + 1).then((data: number) => {
          s += data;
          console.log("promise done ", Date.now());
          return { data };
        })
      );
    }
    Promise.allSettled(datapending).then((data) => {
      console.log(data);
      res.status(200).json({ data: s });
    });
  };

  function promise(a: any, b: any): Promise<number> {
    return new Promise((resolve) => {
      console.log("log start");
      setTimeout(() => {
        resolve(a * b);
      }, 5000);
    });
  }
  app.get(`/test-thread`, handleThread);
  app.get(`/test-thread-fast`, (req, res: any) => {
    let i = 1;
    res.status(200).json("Success test-thread1 " + Date());
  });

  app.listen(environment.port, () => {
    console.log(`Server is running in http://localhost:${environment.port}`);
  });
};

startSerser();
