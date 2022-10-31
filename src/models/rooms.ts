import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { RoomTypes, RoomTypesId } from './room_types';
import type { UserRoom, UserRoomId } from './user_room';

export interface RoomsAttributes {
  id: number;
  code: string;
  typeId: number;
  createdAt: Date;
}

export type RoomsPk = "id";
export type RoomsId = Rooms[RoomsPk];
export type RoomsOptionalAttributes = "id" | "createdAt";
export type RoomsCreationAttributes = Optional<RoomsAttributes, RoomsOptionalAttributes>;

export class Rooms extends Model<RoomsAttributes, RoomsCreationAttributes> implements RoomsAttributes {
  id!: number;
  code!: string;
  typeId!: number;
  createdAt!: Date;

  // Rooms belongsTo RoomTypes via typeId
  type!: RoomTypes;
  getType!: Sequelize.BelongsToGetAssociationMixin<RoomTypes>;
  setType!: Sequelize.BelongsToSetAssociationMixin<RoomTypes, RoomTypesId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<RoomTypes>;
  // Rooms hasMany UserRoom via roomId
  userRooms!: UserRoom[];
  getUserRooms!: Sequelize.HasManyGetAssociationsMixin<UserRoom>;
  setUserRooms!: Sequelize.HasManySetAssociationsMixin<UserRoom, UserRoomId>;
  addUserRoom!: Sequelize.HasManyAddAssociationMixin<UserRoom, UserRoomId>;
  addUserRooms!: Sequelize.HasManyAddAssociationsMixin<UserRoom, UserRoomId>;
  createUserRoom!: Sequelize.HasManyCreateAssociationMixin<UserRoom>;
  removeUserRoom!: Sequelize.HasManyRemoveAssociationMixin<UserRoom, UserRoomId>;
  removeUserRooms!: Sequelize.HasManyRemoveAssociationsMixin<UserRoom, UserRoomId>;
  hasUserRoom!: Sequelize.HasManyHasAssociationMixin<UserRoom, UserRoomId>;
  hasUserRooms!: Sequelize.HasManyHasAssociationsMixin<UserRoom, UserRoomId>;
  countUserRooms!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Rooms {
    return Rooms.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'room_types',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'rooms',
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
        name: "fk_room_type",
        using: "BTREE",
        fields: [
          { name: "typeId" },
        ]
      },
    ]
  });
  }
}
