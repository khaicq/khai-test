import express, { Express } from "express";
import path from "path";

const useStatic = (app: Express) => {
  const folder = ["uploads"];
  for (const item of folder) {
    app.use(
      item,
      express.static(path.join(__dirname.replace("middlewares", ""), item))
    );
  }
};

export default useStatic;
