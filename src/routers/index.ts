import { Router } from "express";
import AuthRoutes from "./auth.route";
import RoomTypeRoutes from "./room-type.route";
import RoomRoutes from "./room.route";
import UserRoutes from "./user.route";
import UserRoomRoutes from "./user-room.route";

const ApiRoutes = () => {
  const app = Router();
  UserRoutes(app);
  AuthRoutes(app);
  RoomRoutes(app);
  RoomTypeRoutes(app);
  UserRoomRoutes(app);

  return app;
};

export default ApiRoutes;
