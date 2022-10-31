import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Rooms, RoomsId } from './rooms';

export interface RoomTypesAttributes {
  id: number;
  name: string;
  pricePerDay: number;
  createdAt: Date;
}

export type RoomTypesPk = "id";
export type RoomTypesId = RoomTypes[RoomTypesPk];
export type RoomTypesOptionalAttributes = "id" | "createdAt";
export type RoomTypesCreationAttributes = Optional<RoomTypesAttributes, RoomTypesOptionalAttributes>;

export class RoomTypes extends Model<RoomTypesAttributes, RoomTypesCreationAttributes> implements RoomTypesAttributes {
  id!: number;
  name!: string;
  pricePerDay!: number;
  createdAt!: Date;

  // RoomTypes hasMany Rooms via typeId
  rooms!: Rooms[];
  getRooms!: Sequelize.HasManyGetAssociationsMixin<Rooms>;
  setRooms!: Sequelize.HasManySetAssociationsMixin<Rooms, RoomsId>;
  addRoom!: Sequelize.HasManyAddAssociationMixin<Rooms, RoomsId>;
  addRooms!: Sequelize.HasManyAddAssociationsMixin<Rooms, RoomsId>;
  createRoom!: Sequelize.HasManyCreateAssociationMixin<Rooms>;
  removeRoom!: Sequelize.HasManyRemoveAssociationMixin<Rooms, RoomsId>;
  removeRooms!: Sequelize.HasManyRemoveAssociationsMixin<Rooms, RoomsId>;
  hasRoom!: Sequelize.HasManyHasAssociationMixin<Rooms, RoomsId>;
  hasRooms!: Sequelize.HasManyHasAssociationsMixin<Rooms, RoomsId>;
  countRooms!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof RoomTypes {
    return RoomTypes.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pricePerDay: {
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
    tableName: 'room_types',
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
    ]
  });
  }
}
