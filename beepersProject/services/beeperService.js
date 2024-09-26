var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jsonService from "../DAL/jsonBeepers.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { BeeperStatus } from "../models/types.js";
import { v4 as uuid } from "uuid";
import { coordinates } from "../data/coordinates.js";
const EXP_TIME_SEC = 10;
const EXP_TIME_MS = EXP_TIME_SEC * 1000;
const explodingBeepers = [];
const getBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonService.readBeepers();
    return beepers;
});
const addBeeper = (beeperName) => __awaiter(void 0, void 0, void 0, function* () {
    const newBeeper = {
        id: uuid(),
        name: beeperName,
        status: BeeperStatus.MANUFACTURED,
        created_at: new Date(),
    };
    yield jsonService.writeBeeper(newBeeper);
    return newBeeper;
});
const updateBeeperStatus = (beeperId, lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const { beepers, beeper } = yield getBeepersWithBeeperById(beeperId);
    // check status
    if (beeper.status >= BeeperStatus.DEPLOYED)
        throw new ErrorWithStatusCode("beeper already deployed.", 400);
    if (beeper.status === BeeperStatus.SHIPPED) {
        // deploy and set timer for detonation
        validateCoordinates(lat, lon);
        setDetonationTimer(beeperId);
        beeper.latitude = lat;
        beeper.longitude = lon;
    }
    // any way: status -> next status
    beeper.status++;
    yield jsonService.rewriteBeepers(beepers);
});
const deleteBeeper = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonService.readBeepers();
    const beeperToDeleteIdx = beepers.findIndex((beeper) => beeper.id === beeperId);
    if (beeperToDeleteIdx === -1)
        throw new ErrorWithStatusCode("Beeper not found!", 400);
    // cancel timer if set
    if ((yield getBeeperById(beeperId)).status == BeeperStatus.DEPLOYED)
        cancelDetonation(beeperId);
    // remove beeper
    beepers.splice(beeperToDeleteIdx, 1);
    yield jsonService.rewriteBeepers(beepers);
});
const getBeeperById = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonService.readBeepers();
    const beeper = beepers.find((b) => b.id === beeperId);
    if (!beeper)
        throw new ErrorWithStatusCode("beeper not found!", 404);
    return beeper;
});
const getBeepersByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonService.readBeepers();
    const filtered = beepers.filter((b) => b.status === status);
    return filtered;
});
function setDetonationTimer(beeperId) {
    const timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield explodeBeeper(beeperId); }), EXP_TIME_MS);
    explodingBeepers.push({ beeperId, timerId: timer });
}
function explodeBeeper(beeperId) {
    return __awaiter(this, void 0, void 0, function* () {
        // change beeper status to detonated
        const { beepers, beeper } = yield getBeepersWithBeeperById(beeperId);
        beeper.status = BeeperStatus.DETONATED;
        beeper.detonated_at = new Date();
        yield jsonService.rewriteBeepers(beepers);
        removeExplodingBeeper(beeperId);
        console.log("beeper exploded");
    });
}
function removeExplodingBeeper(beeperId) {
    const idx = explodingBeepers.findIndex((t) => t.beeperId === beeperId);
    if (idx === -1)
        throw new ErrorEvent("exploding beeper not found");
    explodingBeepers.splice(idx, 1);
}
function cancelDetonation(beeperId) {
    const explodingBeeper = explodingBeepers.find((t) => t.beeperId === beeperId);
    if (!explodingBeeper)
        throw new Error("cannot cancel explosion, timer not found");
    clearTimeout(explodingBeeper.timerId);
    removeExplodingBeeper(beeperId);
}
function getBeepersWithBeeperById(beeperId) {
    return __awaiter(this, void 0, void 0, function* () {
        const beepers = yield jsonService.readBeepers();
        const beeper = beepers.find((b) => b.id === beeperId);
        if (!beeper)
            throw new ErrorWithStatusCode("beeper not found!", 404);
        return { beepers, beeper };
    });
}
export default {
    getBeepers,
    addBeeper,
    updateBeeperStatus,
    deleteBeeper,
    getBeeperById,
    getBeepersByStatus,
};
function validateCoordinates(lat, lon) {
    if (!lat || !lon)
        throw new ErrorWithStatusCode("longitude and latitude required!", 400);
    if (!coordinates.find((cor) => cor.lat === lat && cor.lon === lon))
        throw new ErrorWithStatusCode("Invalid coordinates", 400);
}
