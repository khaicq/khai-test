import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken, adminVerify } from "../middlewares/index";

import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req: any, _file: any, cb: any) {
    console.log("!!!!!!!!!!!");
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    if (!fs.existsSync("./uploads/tmp")) {
      fs.mkdirSync("./uploads/tmp");
    }
    cb(null, "uploads/tmp");
  },
  filename: function (_req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const router = Router();

const UserRoutes = (app: Router) => {
  const user = new UserController();
  app.use("/user", router);

  // router.post("/upload", upload.single("file_upload"), user.uploadFile);
  router.post("/create-admin", user.createAdmin);
  router.post("/create", authenticateToken, adminVerify, user.create);
  router.get("/get-list", authenticateToken, adminVerify, user.getMany);
  router.get("/get-detail", authenticateToken, user.getDetail);
  router.post("/update", authenticateToken, user.updateDetail);
  router.post("/update-password", authenticateToken, user.updatePassword);
  router.delete("/delete/:id", authenticateToken, adminVerify, user.remove);
};

export default UserRoutes;
