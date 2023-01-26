import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Roles, RolesId } from './roles';

export interface UsersAttributes {
  id: number;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  birthday?: number;
  address?: string;
  picture?: string;
  roleId: number;
  googleId?: string;
  facebookId?: string;
  createdAt: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "password" | "phoneNumber" | "birthday" | "address" | "picture" | "googleId" | "facebookId" | "createdAt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  name!: string;
  email!: string;
  password?: string;
  phoneNumber?: string;
  birthday?: number;
  address?: string;
  picture?: string;
  roleId!: number;
  googleId?: string;
  facebookId?: string;
  createdAt!: Date;

  // Users belongsTo Roles via roleId
  role!: Roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    googleId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    facebookId: {
      type: DataTypes.STRING(255),
      allowNull: true
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
        ]
      },
      {
        name: "fk_user_role",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
  }
}
