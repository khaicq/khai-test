import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { UserRoom, UserRoomId } from './user_room';
import type { UserTypes, UserTypesId } from './user_types';

export interface UsersAttributes {
  id: number;
  name: string;
  number: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthday?: number;
  address?: string;
  picture?: string;
  typeId: number;
  createdBy?: number;
  createdAt: Date;
}

export type UsersPk = "id" | "email";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "phoneNumber" | "birthday" | "address" | "picture" | "createdBy" | "createdAt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  name!: string;
  number!: string;
  email!: string;
  password!: string;
  phoneNumber?: string;
  birthday?: number;
  address?: string;
  picture?: string;
  typeId!: number;
  createdBy?: number;
  createdAt!: Date;

  // Users belongsTo UserTypes via typeId
  type!: UserTypes;
  getType!: Sequelize.BelongsToGetAssociationMixin<UserTypes>;
  setType!: Sequelize.BelongsToSetAssociationMixin<UserTypes, UserTypesId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<UserTypes>;
  // Users hasMany UserRoom via userId
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
  // Users belongsTo Users via createdBy
  createdByUser!: Users;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
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
    number: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birthday: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_types',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
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
    tableName: 'users',
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
          { name: "email" },
        ]
      },
      {
        name: "fk_user_user_type",
        using: "BTREE",
        fields: [
          { name: "typeId" },
        ]
      },
      {
        name: "fk_user_user",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
    ]
  });
  }
}
