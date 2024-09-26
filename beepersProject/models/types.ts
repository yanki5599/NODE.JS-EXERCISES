export interface Beeper {
  id: string;
  name: string;
  status: BeeperStatus;
  createdAt: Date;
  detonatedAt: Date;
  LON: number;
  LAT: number;
}

enum BeeperStatus {
  manufactured,
  assembled,
  shipped,
  deployed,
  detonated,
}
