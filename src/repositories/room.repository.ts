import { WhereOptions } from "sequelize";
import {
  Rooms,
  RoomsAttributes,
  RoomsCreationAttributes,
} from "../models/rooms";

import BaseRepository from "./base.repository";

type CreatedAtrr = RoomsCreationAttributes | undefined;
type Query = WhereOptions<RoomsAttributes> | undefined;
type UpdatedAttr = Partial<RoomsAttributes>;

class RoomRepository extends BaseRepository {
  _model: typeof Rooms;
  constructor() {
    super();
    this._model = this._models.Rooms;
  }

  getMany(query: Query) {
    return this._model.findAll({
      where: query,
      include: [{ association: this._models.Rooms.associations.type }],
    });
  }

  getOne(query: Query) {
    return this._model.findOne({ where: query });
  }

  create(query: CreatedAtrr) {
    return this._model.create(query);
  }

  update(data: UpdatedAttr, query: any) {
    return this._model.update(data, { where: query });
  }

  delete(id: any) {
    return this._model.destroy({ where: { id } });
  }
}

export default RoomRepository;
