export interface Point {
  x: number;
  y: number;
}

export interface Character extends Point {
  targetX: number;
  targetY: number;
  path: Point[];
}

export class Wall {
  public toString() {
    return 'Wall';
  }
}

export class Ground {
  constructor(public level: number) {}

  public toString() {
    return `G ${this.level}`;
  }
}

export type Terrain = Wall | Ground;

export type Arena = Terrain[][];
