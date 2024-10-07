import { Request, Response, NextFunction } from "express";
export const teacherMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== "teacher") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
