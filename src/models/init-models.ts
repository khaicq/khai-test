import type { Sequelize } from "sequelize";
import { RoomTypes as _RoomTypes } from "./room_types";
import type { RoomTypesAttributes, RoomTypesCreationAttributes } from "./room_types";
import { Rooms as _Rooms } from "./rooms";
import type { RoomsAttributes, RoomsCreationAttributes } from "./rooms";
import { UserRoom as _UserRoom } from "./user_room";
import type { UserRoomAttributes, UserRoomCreationAttributes } from "./user_room";
import { UserTypes as _UserTypes } from "./user_types";
import type { UserTypesAttributes, UserTypesCreationAttributes } from "./user_types";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _RoomTypes as RoomTypes,
  _Rooms as Rooms,
  _UserRoom as UserRoom,
  _UserTypes as UserTypes,
  _Users as Users,
};

export type {
  RoomTypesAttributes,
  RoomTypesCreationAttributes,
  RoomsAttributes,
  RoomsCreationAttributes,
  UserRoomAttributes,
  UserRoomCreationAttributes,
  UserTypesAttributes,
  UserTypesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const RoomTypes = _RoomTypes.initModel(sequelize);
  const Rooms = _Rooms.initModel(sequelize);
  const UserRoom = _UserRoom.initModel(sequelize);
  const UserTypes = _UserTypes.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Rooms.belongsTo(RoomTypes, { as: "type", foreignKey: "typeId"});
  RoomTypes.hasMany(Rooms, { as: "rooms", foreignKey: "typeId"});
  UserRoom.belongsTo(Rooms, { as: "room", foreignKey: "roomId"});
  Rooms.hasMany(UserRoom, { as: "userRooms", foreignKey: "roomId"});
  Users.belongsTo(UserTypes, { as: "type", foreignKey: "typeId"});
  UserTypes.hasMany(Users, { as: "users", foreignKey: "typeId"});
  UserRoom.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UserRoom, { as: "userRooms", foreignKey: "userId"});
  Users.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy"});
  Users.hasMany(Users, { as: "users", foreignKey: "createdBy"});

  return {
    RoomTypes: RoomTypes,
    Rooms: Rooms,
    UserRoom: UserRoom,
    UserTypes: UserTypes,
    Users: Users,
  };
}
