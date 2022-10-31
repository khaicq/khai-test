import BaseRepository from "../repositories/base.repository";
import UserRepository from "../repositories/user.repository";
import UserTypeRepository from "../repositories/user-type.repository";
import RoomRepository from "../repositories/room.repository";
import { col, fn, literal, Op, where } from "sequelize";
import RoomTypeRepository from "../repositories/room-type.repository";
import UserRoomRepository from "../repositories/user-room.repository";

export class BaseController {
  protected _userRepository = new UserRepository();
  protected _userTypeRepository = new UserTypeRepository();
  protected _roomRepository = new RoomRepository();
  protected _roomTypeRepository = new RoomTypeRepository();
  protected _userRoomRepository = new UserRoomRepository();

  protected readonly _op = Op;
  protected readonly _fn = fn;
  protected readonly _col = col;
  protected readonly _where = where;
  protected readonly _literal = literal;
  constructor() {}
}

export default BaseRepository;
