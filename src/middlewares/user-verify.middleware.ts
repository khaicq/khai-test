import { Request, Response } from "express";
import { USER_TYPE } from "../contants/contants";
import { environment } from "../environments/environment";
export function userVerify(req: Request, res: Response, next: any) {
  const userLoggedIn = req.body.userLoggedIn;
  if (
    !userLoggedIn ||
    !userLoggedIn.userType ||
    userLoggedIn.userType.id != USER_TYPE.USER_CODE
  ) {
    return res.sendStatus(405);
  }
  next();
}
