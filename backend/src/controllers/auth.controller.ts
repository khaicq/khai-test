import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { encode } from "../libs/encrypt";
import { signJwt, verifyJwt } from "../libs/jwt";
import config from "config";
import { Context } from "vm";

export class AuthControlller extends BaseController {
  login = async (req: Request, res: Response, ctx: Context) => {
    try {
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

      const refresh_token = signJwt(
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
      );
      res.cookie("refresh_token", refresh_token, {
        maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
        httpOnly: true,
      });
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
            // expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
            expiresIn: `2m`,
          }
        ),
        refresh_token: refresh_token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  refreshToken = async (req: Request, res: Response, ctx: Context) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = verifyJwt<any>(refresh_token, "refreshTokenPublicKey");
      if (!decoded) {
        return res.status(401);
      }

      const access_token = signJwt(
        {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          role: decoded.role,
          phoneNumber: decoded.phoneNumber,
        },
        "accessTokenPrivateKey",
        {
          expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
        }
      );

      const new_refresh_token = signJwt(
        {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          role: decoded.role,
          phoneNumber: decoded.phoneNumber,
        },
        "refreshTokenPrivateKey",
        {
          expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
        }
      );

      res.cookie("refresh_token", refresh_token, {
        maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).send({
        access_token,
        refresh_token: new_refresh_token,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
