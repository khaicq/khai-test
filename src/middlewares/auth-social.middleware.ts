import { Request, Response, NextFunction } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/social-login");
}

function notAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/profile");
}

export { isAuthenticated, notAuthenticated };
