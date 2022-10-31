import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Rooms, RoomsId } from './rooms';
import type { Users, UsersId } from './users';

export interface UserRoomAttributes {
  id: number;
  userId: number;
  roomId: number;
  start: number;
  end: number;
  createdAt: Date;
}

export type UserRoomPk = "id";
export type UserRoomId = UserRoom[UserRoomPk];
export type UserRoomOptionalAttributes = "id" | "createdAt";
export type UserRoomCreationAttributes = Optional<UserRoomAttributes, UserRoomOptionalAttributes>;

export class UserRoom extends Model<UserRoomAttributes, UserRoomCreationAttributes> implements UserRoomAttributes {
  id!: number;
  userId!: number;
  roomId!: number;
  start!: number;
  end!: number;
  createdAt!: Date;

  // UserRoom belongsTo Rooms via roomId
  room!: Rooms;
  getRoom!: Sequelize.BelongsToGetAssociationMixin<Rooms>;
  setRoom!: Sequelize.BelongsToSetAssociationMixin<Rooms, RoomsId>;
  createRoom!: Sequelize.BelongsToCreateAssociationMixin<Rooms>;
  // UserRoom belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserRoom {
    return UserRoom.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    start: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'user_room',
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_to_room",
        using: "BTREE",
        fields: [
          { name: "roomId" },
        ]
      },
      {
        name: "fk_to_user",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
