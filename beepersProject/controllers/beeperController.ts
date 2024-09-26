import { Request, Response, NextFunction } from "express";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { Beeper } from "../models/types.js";
import beeperService from "../services/beeperService.js";

export const getBeepers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  } catch (err) {
    next(err);
  }
};
export const addBeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  } catch (err) {
    next(err);
  }
};
export const updateBeeperStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  } catch (err) {
    next(err);
  }
};
export const deleteBeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  } catch (err) {
    next(err);
  }
};
export const getBeeperById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  } catch (err) {
    next(err);
  }
};
export const getBeepersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  } catch (err) {
    next(err);
  }
};
