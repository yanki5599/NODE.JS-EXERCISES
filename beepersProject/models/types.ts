export interface Beeper {
  id: string;
  name: string;
  status: BeeperStatus;
  created_at: Date;
  detonated_at?: Date;
  latitude?: Number;
  longitude?: Number;
}

// do Not change the order!! order matters
export enum BeeperStatus {
  MANUFACTURED,
  ASSEMBLED,
  SHIPPED,
  DEPLOYED,
  DETONATED,
}

export interface BeeperTimer {
  beeperId: string;
  timerId: NodeJS.Timeout;
}
