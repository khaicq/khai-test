import { start } from "repl";
import { WhereOptions } from "sequelize";
import {
  UserRoom,
  UserRoomAttributes,
  UserRoomCreationAttributes,
} from "../models/user_room";

import BaseRepository from "./base.repository";

type CreatedAtrr = UserRoomCreationAttributes | undefined;
type Query = WhereOptions<UserRoomAttributes> | undefined;
type UpdatedAttr = Partial<UserRoomAttributes>;

class UserRoomRepository extends BaseRepository {
  _model: typeof UserRoom;
  constructor() {
    super();
    this._model = this._models.UserRoom;
  }

  getMany(query: Query) {
    return this._model.findAll({
      where: query,
      include: [
        { association: this._models.UserRoom.associations.user },
        { association: this._models.UserRoom.associations.room },
      ],
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

  getRoomUsed(roomId: number, startTime: number, endTime: number) {
    return this._model.findAll({
      where: {
        roomId,
        [this._op.or]: [
          {
            start: {
              [this._op.and]: [
                { [this._op.gte]: startTime },
                { [this._op.lte]: endTime },
              ],
            },
            end: {
              [this._op.and]: [
                { [this._op.gte]: startTime },
                { [this._op.lte]: endTime },
              ],
            },
          },
          {
            start: {
              [this._op.lte]: startTime,
            },
            end: {
              [this._op.gte]: endTime,
            },
          },
        ],
      },
    });
  }

  getAllRoomUsed(startTime: any, endTime: any) {
    return this._model.findAll({
      where: {
        [this._op.or]: [
          {
            start: {
              [this._op.and]: [
                { [this._op.gte]: startTime },
                { [this._op.lte]: endTime },
              ],
            },
            end: {
              [this._op.and]: [
                { [this._op.gte]: startTime },
                { [this._op.lte]: endTime },
              ],
            },
          },
          {
            start: {
              [this._op.lte]: startTime,
            },
            end: {
              [this._op.gte]: endTime,
            },
          },
        ],
      },
    });
  }
}

export default UserRoomRepository;
