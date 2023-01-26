import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { encode } from "../libs/encrypt";
import jsonwebtoken from "jsonwebtoken";
import { environment } from "../environments/environment";
import { signJwt } from "../libs/jwt";
import config from "config";

export class AuthControlller extends BaseController {
  login = async (req: Request, res: Response) => {
    const existedUSer = await this._userRepository.getOneInclueType({
      email: req.body.email,
    });
    if (!existedUSer) {
      return res.status(400).send({ message: "Invalid username password" });
    }
    const encodePassword = encode(req.body.password, req.body.email);
    if (existedUSer.password != encodePassword) {
      return res.status(400).send({ message: "Invalid username password" });
    }
    res.status(200).send({
      access_token: signJwt(
        {
          id: existedUSer.id,
          email: existedUSer.email,
          name: existedUSer.name,
          picture: existedUSer.picture,
          role: existedUSer.role,
          phoneNumber: existedUSer.phoneNumber,
        },
        "accessTokenPrivateKey",
        {
          expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
        }
      ),
      refresh_token: signJwt(
        {
          id: existedUSer.id,
          email: existedUSer.email,
          name: existedUSer.name,
          picture: existedUSer.picture,
          role: existedUSer.role,
          phoneNumber: existedUSer.phoneNumber,
        },
        "refreshTokenPrivateKey",
        {
          expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
        }
      ),
    });
  };
}
