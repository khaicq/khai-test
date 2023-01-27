import BaseRepository from "../repositories/base.repository";
import UserRepository from "../repositories/user.repository";
import UserTypeRepository from "../repositories/user-type.repository";
import { col, fn, literal, Op, where } from "sequelize";

export class BaseController {
  protected _userRepository = new UserRepository();
  protected _userTypeRepository = new UserTypeRepository();
  protected readonly _op = Op;
  protected readonly _fn = fn;
  protected readonly _col = col;
  protected readonly _where = where;
  protected readonly _literal = literal;
  constructor() {}
}

export default BaseRepository;
