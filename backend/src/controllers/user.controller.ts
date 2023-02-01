import { Request, Response } from "express";
import { RESPONSE, USER_TYPE } from "../contants/contants";
import cloudinary from "../libs/cloudinary";
import { encode } from "../libs/encrypt";
import UserRepository from "../repositories/user.repository";
import { BaseController } from "./base.controller";
export class UserController extends BaseController {
  constructor() {
    super();
  }

  create = async (req: Request, res: Response) => {
    try {
      const existedUser = await this._userRepository.getOne({
        email: req.body.email,
      });
      if (existedUser) {
        return res.status(400).send({ message: "Email already existed" });
      }
      const newUser = {
        email: req.body.email,
        password: encode(req.body.password, req.body.email),
        name: req.body.name,
        number: req.body.number,
        roleId: USER_TYPE.USER_CODE,
        address: req.body.address,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
        createdBy: req.body.userLoggedIn.id,
      };
      await this._userRepository.create(newUser);
      res.status(201).send({ data: RESPONSE.createdSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  createAdmin = async (req: Request, res: Response) => {
    try {
      const existedUser = await this._userRepository.getOne({
        email: req.body.email,
      });
      if (existedUser) {
        return res.status(400).send({ message: "Email already existed" });
      }

      const newUser = {
        email: req.body.email,
        password: encode(req.body.password, req.body.email),
        name: req.body.name,
        number: req.body.name,
        roleId: USER_TYPE.ADMIN_CODE,
      };

      await this._userRepository.create(newUser);

      res.status(201).send({ data: RESPONSE.createdSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  getMany = async (req: Request, res: Response) => {
    try {
      console.log(req.query);
      const fillter: any = {
        typeId: USER_TYPE.USER_CODE,
      };
      if (req.query.email) {
        fillter.email = { [this._op.substring]: req.query.email };
      }
      if (req.query.name) {
        fillter.name = { [this._op.substring]: req.query.name };
      }
      const data = await this._userRepository.getMany(fillter);
      console.log(
        "---------------",
        this.getMaxNumber([
          { name: "Cao Quang Khải", number: 1 },
          { name: "Lê Thị Trang", number: 3 },
          { name: "Mai Ngọc", number: 2 },
        ])
      );

      return res.status(200).send(data);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Default error" });
    }
  };

  getDetail = async (req: Request, res: Response) => {
    try {
      console.log({ id: req.body.userLoggedIn.id });
      const user = await this._userRepository.getDetail({
        id: req.body.userLoggedIn.id,
      });
      res.status(200).json({ data: user });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  updateDetail = async (req: Request, res: Response) => {
    try {
      const newUser = {
        name: req.body.name,
        number: req.body.number,
        address: req.body.address,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
      };
      await this._userRepository.update(newUser, {
        id: req.body.userLoggedIn.id,
      });
      res.status(200).json({ data: RESPONSE.updatedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  updatePassword = async (req: Request, res: Response) => {
    try {
      const newUser = {
        name: req.body.name,
        number: req.body.number,
        address: req.body.address,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
      };
      const existedUSer = await this._userRepository.getOne({
        id: req.body.userLoggedIn.id,
      });

      if (!existedUSer) {
        return res.sendStatus(400);
      }

      const encodePassword = encode(
        req.body.oldPassword,
        existedUSer.email || ""
      );
      if (existedUSer.password != encodePassword) {
        return res.status(400).send({ message: "Invalid username password" });
      }

      const encodeNewPassword = encode(
        req.body.newPassword,
        existedUSer.email || ""
      );

      await this._userRepository.update(
        { password: encodeNewPassword },
        {
          id: req.body.userLoggedIn.id,
        }
      );
      res.status(200).send({ data: RESPONSE.updatedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this._userRepository.delete(req.params.id);
      res.status(200).json({ data: RESPONSE.deletedSuccessfully });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };

  uploadFile = async (req: any, res: Response) => {
    try {
      console.log(req.file, req.body.id);
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "samples",
      });
      await this._userRepository.update(
        { picture: result.url },
        { id: req.body.id }
      );
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Unknown error" });
    }
  };
  getMaxNumber = (data: any) => {
    let max: any = null;
    if (!data || !Array.isArray(data) || data.length == 0) {
      return max;
    }
    data.forEach((element: any) => {
      max = max && max.number > element.number ? max : element;
    });
    return max;
  };
  sum = (a: number, b: number) => {
    return a + b;
  };

  socialLoginHandler = async (social, dataProfile) => {
    console.log({ dataProfile });
    let user;
    if (social == "FACEBOOK") {
      user = await this._userRepository.getOne({ facebookId: dataProfile.id });
    } else if (social == "GOOGLE") {
      user = await this._userRepository.getOne({ googleId: dataProfile.id });
    }
    if (user) {
      return user;
    }
    let newUser = {
      email: dataProfile?.emails && dataProfile?.emails[0].value,
      name: `${dataProfile?.name?.familyName} ${dataProfile?.name?.givenName}`.trim(),
      picture: dataProfile?.photos && dataProfile?.photos[0].value,
      facebookId: social == "FACEBOOK" ? dataProfile?.id : null,
      googleId: social == "GOOGLE" ? dataProfile?.id : null,
      roleId: USER_TYPE.USER_CODE,
    };
    return await this._userRepository.create(newUser);
  };
}
