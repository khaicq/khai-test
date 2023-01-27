import { col, fn, literal, Op, where } from "sequelize";
import sequelize from "../models";
import { initModels } from "../models/init-models";

const models = initModels(sequelize);
class BaseRepository {
  protected readonly _models = models;
  protected readonly _op = Op;
  protected readonly _fn = fn;
  protected readonly _col = col;
  protected readonly _where = where;
  protected readonly _literal = literal;
}

export default BaseRepository;
