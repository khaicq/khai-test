import { Router } from "express";
import { UserRoomControlller } from "../controllers/user-room.controller";
import { adminVerify, authenticateToken } from "../middlewares";

const route = Router();
const UserRoomRoutes = (app: Router) => {
  const userRoom = new UserRoomControlller();
  app.use("/user-room", route);
  route.post("/get-list", authenticateToken, adminVerify, userRoom.getList);
  route.get("/get-my-list", authenticateToken, userRoom.getMyList);
  route.delete("/delete/:id", authenticateToken, userRoom.remove);
  route.post("/register-room", authenticateToken, userRoom.registerRoom);
};

export default UserRoomRoutes;
