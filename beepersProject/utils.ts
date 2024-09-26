import { Beeper, BeeperDTO, BeeperStatus } from "./models/types.js";

export const normalizeStatusDisplay = (...beepers: Beeper[]): BeeperDTO[] => {
  return beepers.map((beeper: Beeper): BeeperDTO => {
    const res: any = { ...beeper }; // must do any cuz status changes from enum -> string
    res.status = BeeperStatus[beeper.status] as string;
    return res as BeeperDTO;
  });
};
