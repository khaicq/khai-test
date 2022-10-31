import { Request, Response } from "express";
import { RESPONSE, USER_TYPE } from "../contants/contants";
import { encode } from "../libs/encrypt";
import UserRepository from "../repositories/user.repository";
import { BaseController } from "./base.controller";
export class RoomTypeControlller extends BaseController {
  constructor() {
    super();
  }

  getList = async (req: Request, res: Response) => {
    try {
      const data = await this._roomTypeRepository.getMany({});
      res.status(200).send({ data });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const existedRoomType = await this._roomTypeRepository.getOne({
        name: req.body.name,
      });
      if (existedRoomType) {
        return res.status(400).send({ message: "Room code already existed" });
      }
      const newRoomType = {
        name: req.body.name,
        pricePerDay: req.body.pricePerDay,
      };
      await this._roomTypeRepository.create(newRoomType);
      res.status(201).send({ data: RESPONSE.createdSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const newRoom = {
        name: req.body.name,
        pricePerDay: req.body.pricePerDay,
      };
      await this._roomTypeRepository.update(newRoom, {
        id: req.body.id,
      });
      res.status(200).json({ data: RESPONSE.updatedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this._roomTypeRepository.delete(req.params.id);
      res.status(200).json({ data: RESPONSE.deletedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };
}
