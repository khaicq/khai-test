import { Request, Response } from "express";

import jsonwebtoken from "jsonwebtoken";
import { environment } from "../environments/environment";
export function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jsonwebtoken.verify(
    token,
    environment.token_secret as string,
    (err, user: any) => {
      if (err) return res.sendStatus(403);
      req.body.userLoggedIn = user;
      next();
    }
  );
}

export function loginValidation(req: Request, res: Response, next: any) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email/Password isn't empty" });
  }
  next();
}
