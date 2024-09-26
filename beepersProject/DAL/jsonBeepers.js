var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from "jsonfile";
import dotenv from "dotenv";
dotenv.config();
const DB_PATH = process.env.DB_PATH || "./data/db.json";
import fs from "fs";
function ensureJsonFileExists() {
    if (!fs.existsSync(DB_PATH)) {
        jsonfile.writeFileSync(DB_PATH, []);
    }
}
export const writeBeeper = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    ensureJsonFileExists();
    const beepers = yield readBeepers();
    beepers.push(beeper);
    yield jsonfile.writeFile(DB_PATH, beepers);
});
export const readBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    ensureJsonFileExists();
    const beepers = yield jsonfile.readFile(DB_PATH);
    return beepers;
});
export const rewriteBeepers = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    ensureJsonFileExists();
    yield jsonfile.writeFile(DB_PATH, beepers);
});
