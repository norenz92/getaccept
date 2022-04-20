export interface Scoreboard {
  frames: Frame[];
  score: number;
}

export interface Frame {
  throws: [number | undefined, number | undefined] | [number | undefined, number | undefined, number | undefined] | [];
  score?: number;
}