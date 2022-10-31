import { WhereOptions } from "sequelize";
import { UserTypes, UserTypesAttributes } from "../models/user_types";
import BaseRepository from "./base.repository";

type Query = WhereOptions<UserTypesAttributes> | undefined;

class UserTypeRepository extends BaseRepository {
  _model: typeof UserTypes;
  constructor() {
    super();
    this._model = this._models.UserTypes;
  }

  getOne(query: Query) {
    return this._model.findOne({ where: query });
  }
}

export default UserTypeRepository;
