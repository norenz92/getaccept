export interface Scoreboard {
  frames: Frame[];
  score: number;
  maxScore: number;
}

export interface Frame {
  throws: [number | undefined, number | undefined] | [number | undefined, number | undefined, number | undefined] | [];
  score?: number;
}