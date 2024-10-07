import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler.js";

export const getGrades = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const addGrade = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const removeGrade = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const updateGrade = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getAverageGrade = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export const getUsersAverage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
