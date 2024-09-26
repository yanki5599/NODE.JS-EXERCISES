import { Request, Response, NextFunction } from "express";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { Beeper, BeeperStatus } from "../models/types.js";
import beeperService from "../services/beeperService.js";

export const getBeepers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const beepers = await beeperService.getBeepers();
    res.status(200).send(beepers);
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
    const beeperName: string | undefined = req.body.beeperName;
    if (!beeperName)
      throw new ErrorWithStatusCode("beeperName is required!", 400);
    const added = await beeperService.addBeeper(beeperName);
    res.status(201).send(added);
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
    await beeperService.updateBeeperStatus(beeperId, +latitude, +longitude);
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
    const beeperId = req.params.id;
    await beeperService.deleteBeeper(beeperId);
    res.status(204).send();
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
    const beeperId = req.params.id;
    const beeper = await beeperService.getBeeperById(beeperId);
    res.status(200).send(beeper);
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
    const status = req.params.status;
    const byStatus: BeeperStatus = Object.keys(BeeperStatus).indexOf(status);
    const beepers = await beeperService.getBeepersByStatus(
      byStatus as BeeperStatus
    );
    res.status(200).send(beepers);
  } catch (err) {
    next(err);
  }
};
