import { Arena, Point, Ground } from './types';

interface PathNode {
  x: number;
  y: number;
  cost: number;
  cameFrom: PathNode | undefined;
}

interface FindPathParams {
  characterX: number;
  characterY: number;
  targetX: number;
  targetY: number;
  arena: Arena;
}

export const sign = n => (n === 0 ? n : Math.round(n / Math.abs(n)));

export const findPath = ({
  characterX,
  characterY,
  targetX,
  targetY,
  arena,
}: FindPathParams): Point[] => {
  const closedSet = [];
  const openSet = [
    { x: characterX, y: characterY, cost: 0, cameFrom: undefined },
  ];

  const exploredNodes = exploreNodes(openSet, closedSet, arena);
  const targetNode = exploredNodes.find(
    node => node.x === targetX && node.y === targetY,
  );

  return tracePath(targetNode, []).reverse();
};

const tracePath = (node, path): Point[] =>
  node ? tracePath(node.cameFrom, path.concat({ x: node.x, y: node.y })) : path;

const exploreNodes = (
  openSet: PathNode[],
  closedSet: PathNode[],
  arena: Arena,
): PathNode[] => {
  const origin = openSet.reduce(
    (acc, item) => (item.cost < acc.cost ? item : acc),
    { x: 0, y: 0, cost: Infinity, cameFrom: undefined },
  );

  const neighbours = nodeNeighbours(origin, arena)
    .map(neighbour => lowerCostNode(closedSet, neighbour))
    .filter(e => !!e);

  const newOpenSet = openSet
    .filter(n => !(n.x === origin.x && n.y === origin.y))
    .concat(neighbours);

  const newClosedSet = closedSet.concat(origin);

  return openSet.length > 0
    ? exploreNodes(newOpenSet, newClosedSet, arena)
    : newClosedSet;
};

const lowerCostNode = (
  closedSet: PathNode[],
  neighbour: PathNode,
): PathNode | undefined => {
  const matchingNode = closedSet.find(
    e => e.x === neighbour.x && e.y === neighbour.y,
  );

  return matchingNode
    ? matchingNode.cost > neighbour.cost ? neighbour : undefined
    : neighbour;
};

const nodeNeighbours = (node: PathNode, arena: Arena): PathNode[] =>
  [-1, 0, 1]
    .map((e, i, arr) => arr.map(e1 => [e, e1]))
    .reduce((a, b) => a.concat(b))
    .filter(([x, y]) => !(x === 0 && y === 0))
    .map(([offsetX, offsetY]) => {
      const x = node.x + offsetX;
      const y = node.y + offsetY;

      const terrain = arena[x] && arena[x][y];

      return { x, y, terrain, offsetX, offsetY };
    })
    .filter(({ terrain }) => terrain && terrain instanceof Ground)
    .map(({ x, y, terrain, offsetX, offsetY }) => {
      const cost = (terrain as Ground).level;

      const movesDiagonally = offsetX !== 0 && offsetY !== 0;
      const additionalCost = movesDiagonally ? cost * Math.sqrt(2) : cost;

      return {
        x,
        y,
        cameFrom: node,
        cost: node.cost + additionalCost,
      };
    });
