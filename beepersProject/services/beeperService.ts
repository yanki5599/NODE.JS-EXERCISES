import * as jsonService from "../DAL/jsonBeepers.js";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
import { Beeper, BeeperStatus, BeeperTimer } from "../models/types.js";
import { v4 as uuid } from "uuid";
import { coordinates } from "../data/coordinates.js";
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
const updateBeeperStatus = async (
  beeperId: string,
  lat?: number,
  lon?: number
): Promise<void> => {
  const { beepers, beeper } = await getBeepersWithBeeperById(beeperId);
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
    async () => await explodeBeeper(beeperId),
    EXP_TIME_MS
  );
  explodingBeepers.push({ beeperId, timerId: timer });
}

async function explodeBeeper(beeperId: string): Promise<void> {
  // change beeper status to detonated
  const { beepers, beeper } = await getBeepersWithBeeperById(beeperId);

  beeper.status = BeeperStatus.DETONATED;
  beeper.detonated_at = new Date();
  await jsonService.rewriteBeepers(beepers);
  removeExplodingBeeper(beeperId);
  console.log("beeper exploded");
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
  removeExplodingBeeper(beeperId);
}

async function getBeepersWithBeeperById(
  beeperId: string
): Promise<{ beepers: Beeper[]; beeper: Beeper }> {
  const beepers: Beeper[] = await jsonService.readBeepers();
  const beeper = beepers.find((b) => b.id === beeperId);
  if (!beeper) throw new ErrorWithStatusCode("beeper not found!", 404);
  return { beepers, beeper };
}

export default {
  getBeepers,
  addBeeper,
  updateBeeperStatus,
  deleteBeeper,
  getBeeperById,
  getBeepersByStatus,
};
function validateCoordinates(lat?: number, lon?: number): void {
  if (!lat || !lon)
    throw new ErrorWithStatusCode("longitude and latitude required!", 400);

  if (!coordinates.find((cor) => cor.lat === lat && cor.lon === lon))
    throw new ErrorWithStatusCode("Invalid coordinates", 400);
}
