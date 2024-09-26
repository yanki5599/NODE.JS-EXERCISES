import * as jsonService from "../DAL/jsonBeepers.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { Beeper, BeeperStatus, BeeperTimer } from "../models/types.js";
import { v4 as uuid } from "uuid";

const EXP_TIME_SEC: number = 10;
const EXP_TIME_MS: number = EXP_TIME_SEC * 1000;

const explodingBeepers: BeeperTimer[] = [];
const getBeepers = async (): Promise<Beeper[]> => {
  const beepers = await jsonService.readBeepers();
  return beepers;
};
const addBeeper = async (beeperName: string): Promise<Beeper> => {
  const newBeeper: Beeper = {
    id: uuid(),
    name: beeperName,
    status: BeeperStatus.MANUFACTURED,
    created_at: new Date(),
  };
  await jsonService.writeBeeper(newBeeper);
  return newBeeper;
};
const updateBeeperStatus = async (beeperId: string): Promise<void> => {
  const beepers: Beeper[] = await jsonService.readBeepers();
  const beeper = beepers.find((b) => b.id === beeperId);
  if (!beeper) throw new ErrorWithStatusCode("beeper not found!", 404);
  // check status
  if (beeper.status === BeeperStatus.DEPLOYED)
    throw new ErrorWithStatusCode("beeper already deployed.", 400);
  if (beeper.status === BeeperStatus.SHIPPED) {
    // deploy and set timer for detonation
    setDetonationTimer(beeperId);
  }
  // status -> next status
  beeper.status++;
  await jsonService.rewriteBeepers(beepers);
};
const deleteBeeper = async (beeperId: string): Promise<void> => {
  const beepers: Beeper[] = await jsonService.readBeepers();
  const beeperToDeleteIdx: number = beepers.findIndex(
    (beeper) => beeper.id === beeperId
  );
  if (beeperToDeleteIdx === -1)
    throw new ErrorWithStatusCode("Beeper not found!", 400);
  // cancel timer if set
  cancelDetonation(beeperId);
  // remove beeper
  beepers.splice(beeperToDeleteIdx, 1);
  await jsonService.rewriteBeepers(beepers);
};
const getBeeperById = async (beeperId: string) => {
  const beepers: Beeper[] = await jsonService.readBeepers();
  const beeper = beepers.find((b) => b.id === beeperId);
  if (!beeper) throw new ErrorWithStatusCode("beeper not found!", 404);
  return beeper;
};
const getBeepersByStatus = async (status: BeeperStatus) => {
  const beepers: Beeper[] = await jsonService.readBeepers();
  const filtered: Beeper[] = beepers.filter((b) => b.status === status);
  return filtered;
};

function setDetonationTimer(beeperId: string) {
  const timer: NodeJS.Timeout = setTimeout(
    () => explodeBeeper(beeperId),
    EXP_TIME_MS
  );
  explodingBeepers.push({ beeperId, timerId: timer });
}

async function explodeBeeper(beeperId: string): Promise<void> {
  // change beeper status to detonated
  const beepers = await jsonService.readBeepers();
  const beeper = beepers.find((b) => b.id === beeperId);
  if (!beeper)
    throw new ErrorWithStatusCode(
      "Internal error exploding beeper! beeper not found",
      500
    );
  beeper.status = BeeperStatus.DETONATED;
  await jsonService.rewriteBeepers(beepers);
  removeExplodingBeeper(beeperId);
}

function removeExplodingBeeper(beeperId: string) {
  const idx: number = explodingBeepers.findIndex(
    (t) => t.beeperId === beeperId
  );
  if (idx === -1) throw new ErrorEvent("exploding beeper not found");
  explodingBeepers.splice(idx, 1);
}
function cancelDetonation(beeperId: string) {
  const explodingBeeper: BeeperTimer | undefined = explodingBeepers.find(
    (t) => t.beeperId === beeperId
  );
  if (!explodingBeeper)
    throw new Error("cannot cancel explosion, timer not found");
  clearTimeout(explodingBeeper.timerId);
}

export default {
  getBeepers,
  addBeeper,
  updateBeeperStatus,
  deleteBeeper,
  getBeeperById,
  getBeepersByStatus,
};
