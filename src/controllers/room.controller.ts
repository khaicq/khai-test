import { Request, Response } from "express";
import { RESPONSE, USER_TYPE } from "../contants/contants";
import { encode } from "../libs/encrypt";
import UserRepository from "../repositories/user.repository";
import { BaseController } from "./base.controller";
export class RoomControlller extends BaseController {
  constructor() {
    super();
  }

  getList = async (req: Request, res: Response) => {
    try {
      try {
        const allRoomUser = await this._userRoomRepository.getAllRoomUsed(
          req.query.start,
          req.query.end
        );
        console.log(allRoomUser);
        const idUsed: any = [];
        for (let item of allRoomUser) {
          idUsed.push(item.roomId);
        }
        console.log(idUsed);
        const data = await this._roomRepository.getMany({
          id: { [this._op.notIn]: idUsed },
        });
        res.status(200).send({ data });
      } catch (err: any) {
        res.status(400).json({ message: err.message || "Unknown error" });
      }
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const existedRoom = await this._roomRepository.getOne({
        code: req.body.code,
      });
      if (existedRoom) {
        return res.status(400).send({ message: "Room code already existed" });
      }
      const newRoom = {
        code: req.body.code,
        typeId: req.body.typeId,
      };
      await this._roomRepository.create(newRoom);
      res.status(201).send({ data: RESPONSE.createdSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const newRoom = {
        code: req.body.code,
        typeId: req.body.typeId,
      };
      await this._roomRepository.update(newRoom, {
        id: req.body.id,
      });
      res.status(200).json({ data: RESPONSE.updatedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this._roomRepository.delete(req.params.id);
      res.status(200).json({ data: RESPONSE.deletedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };
}
