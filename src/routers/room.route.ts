import { Router } from "express";
import { RoomControlller } from "../controllers/room.controller";
import { adminVerify, authenticateToken } from "../middlewares";

const route = Router();
const RoomRoutes = (app: Router) => {
  const room = new RoomControlller();
  app.use("/room", route);

  route.use("/create", authenticateToken, adminVerify, room.create);
  route.get("/get-list", authenticateToken, room.getList);
  route.post("/update", authenticateToken, adminVerify, room.update);
  route.delete("/delete/:id", authenticateToken, adminVerify, room.remove);
};

export default RoomRoutes;
