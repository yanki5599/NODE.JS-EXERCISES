import { BeeperStatus } from "./models/types.js";
export const normalizeStatusDisplay = (...beepers) => {
    return beepers.map((beeper) => {
        const res = Object.assign({}, beeper); // must do any cuz status changes from enum -> string
        res.status = BeeperStatus[beeper.status];
        return res;
    });
};
