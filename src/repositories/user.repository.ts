import { WhereOptions } from "sequelize";
import {
  Users,
  UsersAttributes,
  UsersCreationAttributes,
} from "../models/users";
import BaseRepository from "./base.repository";

type CreatedAtrr = UsersCreationAttributes | undefined;
type Query = WhereOptions<UsersAttributes> | undefined;
type UpdatedAttr = Partial<UsersAttributes>;

class UserRepository extends BaseRepository {
  _model: typeof Users;
  constructor() {
    super();
    this._model = this._models.Users;
  }

  getMany(query: Query, include?: any) {
    return this._model.findAll({
      where: query,
      attributes: { include, exclude: ["password"] },
    });
  }

  getOne(query: Query) {
    return this._model.findOne({ where: query });
  }

  getOneInclueType(query: Query) {
    return this._model.findOne({
      where: query,
      include: [
        {
          association: this._models.Users.associations.type,
          attributes: ["id", "name"],
        },
      ],
    });
  }

  create(data: CreatedAtrr) {
    return this._model.create(data);
  }

  getDetail(query: Query) {
    return this._model.findOne({
      where: query,
      attributes: { exclude: ["password"] },
      include: [{ association: this._models.Users.associations.type }],
    });
  }

  update(data: UpdatedAttr, query: any) {
    return this._model.update(data, { where: query });
  }

  delete(id: any) {
    return this._model.destroy({ where: { id } });
  }

  //   getByCompanyName(companyName: string) {
  //     return this._model.findAll({
  //       where: { "$company.name$": { [this._op.substring]: companyName } },
  //       include: [{ association: this._models.Users.associations.company }],
  //     });
  //   }

  //   getByCompanyNameAndRole(companyName: string, role: string) {
  //     return this._model.findAll({
  //       where: {
  //         [this._op.and]: [
  //           { "$company.name$": { [this._op.substring]: companyName } },
  //           { "$userRoles.role.name$": role },
  //         ],
  //       },
  //       include: [
  //         { association: this._models.Users.associations.company },
  //         {
  //           association: this._models.Users.associations.userRoles,
  //           include: [{ association: this._models.UserRole.associations.role }],
  //         },
  //       ],
  //     });
  //   }
}

export default UserRepository;
