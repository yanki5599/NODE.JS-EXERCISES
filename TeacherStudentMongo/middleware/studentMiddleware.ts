import { Request, Response, NextFunction } from "express";
export const studentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== "student") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
