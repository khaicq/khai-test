import { WhereOptions } from "sequelize";
import { Roles, RolesAttributes } from "../models/roles";
import BaseRepository from "./base.repository";

type Query = WhereOptions<RolesAttributes> | undefined;

class UserTypeRepository extends BaseRepository {
  _model: typeof Roles;
  constructor() {
    super();
    this._model = this._models.Roles;
  }

  getOne(query: Query) {
    return this._model.findOne({ where: query });
  }
}

export default UserTypeRepository;
