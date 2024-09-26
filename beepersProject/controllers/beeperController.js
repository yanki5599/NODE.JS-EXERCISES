var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import beeperService from "../services/beeperService.js";
export const getBeepers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield beeperService.getBeepers();
    }
    catch (err) {
        next(err);
    }
});
export const addBeeper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (err) {
        next(err);
    }
});
export const getBeeperById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        next(err);
    }
});
export const getBeepersByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        next(err);
    }
});
