import { Router } from "express";
import { RoomTypeControlller } from "../controllers/room-type.controller";
import { adminVerify, authenticateToken } from "../middlewares";

const route = Router();
const RoomTypeRoutes = (app: Router) => {
  const room = new RoomTypeControlller();
  app.use("/room-type", route);

  route.use("/create", authenticateToken, adminVerify, room.create);
  route.get("/get-list", authenticateToken, adminVerify, room.getList);
  route.post("/update", authenticateToken, adminVerify, room.update);
  route.delete("/delete/:id", authenticateToken, adminVerify, room.remove);
};

export default RoomTypeRoutes;
