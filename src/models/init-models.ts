import type { Sequelize } from "sequelize";
import { Roles as _Roles } from "./roles";
import type { RolesAttributes, RolesCreationAttributes } from "./roles";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _Roles as Roles,
  _Users as Users,
};

export type {
  RolesAttributes,
  RolesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Roles = _Roles.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Users.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(Users, { as: "users", foreignKey: "roleId"});

  return {
    Roles: Roles,
    Users: Users,
  };
}
