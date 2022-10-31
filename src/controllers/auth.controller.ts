import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { encode } from "../libs/encrypt";
import jsonwebtoken from "jsonwebtoken";
import { environment } from "../environments/environment";
// import jwt f

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
      token: jsonwebtoken.sign(
        {
          id: existedUSer.id,
          email: existedUSer.email,
          name: existedUSer.name,
          picture: existedUSer.picture,
          userType: existedUSer.type,
          phoneNumber: existedUSer.phoneNumber,
        },
        environment.token_secret,
        {
          expiresIn: 60 * 60,
        }
      ),
    });
  };
}
