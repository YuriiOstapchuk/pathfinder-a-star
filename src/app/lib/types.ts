export interface Point {
  x: number,
  y: number,
}

export interface Character extends Point {
  targetX: number,
  targetY: number,
  path: Point[],
}

export interface Terrain {}

export class Wall implements Terrain {
  public toString() {
    return 'Wall';
  }
}

export class Ground implements Terrain {
  constructor(public level: number) { }

  public toString() {
    return `G ${this.level}`;
  }
}

export type Arena = Terrain[][];
