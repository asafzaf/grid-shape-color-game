import { Cell, Shape, Color } from "shared";

const SHAPES: Shape[] = ["triangle", "square", "diamond", "circle"];
const COLORS: Color[] = ["red", "green", "blue", "yellow"];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getValidInitialCell(board: Cell[][], row: number, col: number): Cell {
  const invalidShapes = new Set<Shape>();
  const invalidColors = new Set<Color>();

  const neighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  for (const [r, c] of neighbors) {
    const neighbor = board[r]?.[c];
    if (neighbor) {
      invalidShapes.add(neighbor.shape);
      invalidColors.add(neighbor.color);
    }
  }

  const validShapes = SHAPES.filter(s => !invalidShapes.has(s));
  const validColors = COLORS.filter(c => !invalidColors.has(c));

  return {
    shape: random(validShapes),
    color: random(validColors),
    cooldown: 0,
  };
}

export function generateInitialBoard(rows: number, cols: number): Cell[][] {
  const board: Cell[][] = [];

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = getValidInitialCell(board, r, c);
    }
  }

  return board;
}
