import { Request, Response } from "express";

import jsonwebtoken from "jsonwebtoken";
import { environment } from "../environments/environment";
import { verifyJwt } from "../libs/jwt";
export function authenticateToken(req: Request, res: Response, next: any) {
  if (req.isAuthenticated()) {
    req.body.userLoggedIn = req.user;
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const user = verifyJwt(token, "accessTokenPublicKey");
    req.body.userLoggedIn = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
}

export function loginValidation(req: Request, res: Response, next: any) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email/Password isn't empty" });
  }
  next();
}
