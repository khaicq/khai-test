import { Request, Response } from "express";
import { RESPONSE, USER_TYPE } from "../contants/contants";
import { encode } from "../libs/encrypt";
import { BaseController } from "./base.controller";
export class UserRoomControlller extends BaseController {
  constructor() {
    super();
  }

  getList = async (req: Request, res: Response) => {
    try {
      try {
        const query: any = {};
        if (req.body.userId) {
          query.userId = req.body.userId;
        }
        if (req.body.roomId) {
          query.roomId = req.body.roomId;
        }
        const data = await this._userRoomRepository.getMany(query);
        res.status(200).send({ data });
      } catch (err: any) {
        res.status(400).json({ message: err.message || "Unknown error" });
      }
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  getMyList = async (req: Request, res: Response) => {
    try {
      try {
        const query: any = {
          userId: req.body.userLoggedIn?.id,
        };
        const data = await this._userRoomRepository.getMany(query);
        res.status(200).send({ data });
      } catch (err: any) {
        res.status(400).json({ message: err.message || "Unknown error" });
      }
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this._userRoomRepository.delete(req.params.id);
      res.status(200).json({ data: RESPONSE.deletedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  registerRoom = async (req: Request, res: Response) => {
    try {
      const userId = req.body.userLoggedIn?.id;
      if (!userId) {
        return res.sendStatus(400);
      }
      const roomUsed = await this._userRoomRepository.getRoomUsed(
        req.body.roomId,
        req.body.start,
        req.body.end
      );
      if (roomUsed.length > 0) {
        return res.status(400).send({ message: "Room is using" });
      }
      const newUserRome = {
        userId: userId,
        roomId: req.body.roomId,
        start: req.body.start,
        end: req.body.end,
      };
      await this._userRoomRepository.create(newUserRome);
      res.status(200).send({ data: RESPONSE.createdSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };
}
