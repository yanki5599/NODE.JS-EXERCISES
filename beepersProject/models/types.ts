export interface Beeper {
  id: string;
  name: string;
  status: BeeperStatus;
  created_at: Date;
  detonated_at?: Date;
  latitude?: number;
  longitude?: number;
}

export interface BeeperDTO extends Omit<Beeper, "status"> {
  status: string;
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
