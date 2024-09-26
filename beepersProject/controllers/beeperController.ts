import { Request, Response, NextFunction } from "express";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { Beeper, BeeperStatus } from "../models/types.js";
import beeperService from "../services/beeperService.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

export const getBeepers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const beepers = await beeperService.getBeepers();
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
    const beeperId = req.params.id;
    const { latitude, longitude } = req.body;
    await beeperService.updateBeeperStatus(beeperId, latitude, longitude);
    res.status(204).send();
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
