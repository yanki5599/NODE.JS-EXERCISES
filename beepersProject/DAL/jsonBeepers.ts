import jsonfile from "jsonfile";
import { Beeper } from "../models/types.js";
import dotenv from "dotenv";
dotenv.config();
const DB_PATH: string = process.env.DB_PATH || "./data/db.json";

import fs from "fs";

function ensureJsonFileExists() {
  if (!fs.existsSync(DB_PATH)) {
    jsonfile.writeFileSync(DB_PATH, []);
  }
}
export const writeBeeper = async (beeper: Beeper): Promise<void> => {
  ensureJsonFileExists();
  const beepers = await readBeepers();
  beepers.push(beeper);
  await jsonfile.writeFile(DB_PATH, beepers);
};

export const readBeepers = async (): Promise<Beeper[]> => {
  ensureJsonFileExists();
  const beepers = await jsonfile.readFile(DB_PATH);
  return beepers;
};

export const rewriteBeepers = async (beepers: Beeper[]): Promise<void> => {
  ensureJsonFileExists();
  await jsonfile.writeFile(DB_PATH, beepers);
};
