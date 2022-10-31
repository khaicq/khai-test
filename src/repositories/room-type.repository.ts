import { WhereOptions } from "sequelize";
import {
  RoomTypes,
  RoomTypesAttributes,
  RoomTypesCreationAttributes,
} from "../models/room_types";

import BaseRepository from "./base.repository";

type CreatedAtrr = RoomTypesCreationAttributes | undefined;
type Query = WhereOptions<RoomTypesAttributes> | undefined;
type UpdatedAttr = Partial<RoomTypesAttributes>;

class RoomTypeRepository extends BaseRepository {
  _model: typeof RoomTypes;
  constructor() {
    super();
    this._model = this._models.RoomTypes;
  }

  getMany(query: Query) {
    return this._model.findAll({
      where: query,
    });
  }

  getOne(query: Query) {
    return this._model.findOne({ where: query });
  }

  create(query: CreatedAtrr) {
    return this._model.create(query);
  }

  delete(id: any) {
    return this._model.destroy({ where: { id } });
  }

  update(data: UpdatedAttr, query: any) {
    return this._model.update(data, { where: query });
  }
}

export default RoomTypeRepository;
