import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken, adminVerify } from "../middlewares/index";
import upload from "../libs/multer";

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
  router.post(
    "/upload-picture",
    authenticateToken,
    upload.single("picture"),
    user.uploadFile
  );
};

export default UserRoutes;
