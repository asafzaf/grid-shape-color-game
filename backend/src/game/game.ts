import { GameState, Cell } from "shared";
import { generateInitialBoard } from "./init";

export class Game {
  private state: GameState;

  constructor(rows = 3, cols = 6) {
    this.state = {
      board: generateInitialBoard(rows, cols).flat(),
      rows,
      cols,
      score: 0,
      turn: 0,
      isGameOver: false,
    };
  }

  getState(): GameState {
    return this.state;
  }

  clickCell(index: number): boolean {
    if (this.state.isGameOver) return false;

    const cell = this.state.board[index];

    if (!cell || cell.cooldown > 0) return false;

    // Attempt to change shape/color
    const newCell = this.getRandomValidCellForClick(index);
    if (!newCell) {
      this.state.isGameOver = true;
      return false;
    }

    // Update cell
    cell.shape = newCell.shape;
    cell.color = newCell.color;
    cell.cooldown = 3;

    // Reduce cooldowns for other cells
    this.state.board.forEach(c => {
      if (c !== cell && c.cooldown > 0) c.cooldown--;
    });

    // Increase score
    this.state.score += 1;
    this.state.turn += 1;

    return true;
  }

  private getRandomValidCellForClick(index: number): Cell | null {
    const rows = this.state.rows;
    const cols = this.state.cols;
    const row = Math.floor(index / cols);
    const col = index % cols;
    const cell = this.state.board[index];

    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    const invalidShapes = new Set<string>();
    const invalidColors = new Set<string>();

    for (const [r, c] of neighbors) {
      const neighbor = this.state.board[r * cols + c];
      if (neighbor) {
        invalidShapes.add(neighbor.shape);
        invalidColors.add(neighbor.color);
      }
    }

    const SHAPES = ["triangle", "square", "diamond", "circle"];
    const COLORS = ["red", "green", "blue", "yellow"];

    const validShapes = SHAPES.filter(s => s !== cell.shape && !invalidShapes.has(s));
    const validColors = COLORS.filter(c => c !== cell.color && !invalidColors.has(c));

    if (validShapes.length === 0 || validColors.length === 0) return null;

    return {
      shape: validShapes[Math.floor(Math.random() * validShapes.length)] as any,
      color: validColors[Math.floor(Math.random() * validColors.length)] as any,
      cooldown: 0,
    };
  }
}
