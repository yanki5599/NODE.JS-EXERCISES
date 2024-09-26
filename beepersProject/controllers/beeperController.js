var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { BeeperStatus } from "../models/types.js";
import beeperService from "../services/beeperService.js";
export const getBeepers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield beeperService.getBeepers();
        res.status(200).send(beepers);
    }
    catch (err) {
        next(err);
    }
});
export const addBeeper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperName = req.body.beeperName;
        if (!beeperName)
            throw new ErrorWithStatusCode("beeperName is required!", 400);
        const added = yield beeperService.addBeeper(beeperName);
        res.status(201).send(added);
    }
    catch (err) {
        next(err);
    }
});
export const updateBeeperStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const { latitude, longitude } = req.body;
        yield beeperService.updateBeeperStatus(beeperId, +latitude, +longitude);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
export const deleteBeeper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        yield beeperService.deleteBeeper(beeperId);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
});
export const getBeeperById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const beeper = yield beeperService.getBeeperById(beeperId);
        res.status(200).send(beeper);
    }
    catch (err) {
        next(err);
    }
});
export const getBeepersByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const byStatus = Object.keys(BeeperStatus).indexOf(status);
        const beepers = yield beeperService.getBeepersByStatus(byStatus);
        res.status(200).send(beepers);
    }
    catch (err) {
        next(err);
    }
});
