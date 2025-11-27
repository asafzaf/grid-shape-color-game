import { GameState, Cell, Shape, Color } from "shared";

// All possible shapes and colors
const SHAPES: Shape[] = ["triangle", "square", "diamond", "circle"];
const COLORS: Color[] = ["red", "green", "blue", "yellow"];

export class GameStateManager {
  private static _instance: GameStateManager;
  private gameState: GameState;

  private constructor() {
    this.gameState = this.initGame();
  }

  public static getInstance(): GameStateManager {
    if (!this._instance) {
      this._instance = new GameStateManager();
    }
    return this._instance;
  }

  private initGame(): GameState {
    const rows = 3;
    const cols = 6;
    const board: Cell[] = [];

    for (let i = 0; i < rows * cols; i++) {
      // Simple random generation, can add adjacency validation for initial state
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      board.push({ shape, color, cooldown: 0 });
    }

    return {
      board,
      rows,
      cols,
      score: 0,
      turn: 0,
      isGameOver: false,
    };
  }

  public getState(): GameState {
    return this.gameState;
  }

  private getAdjacentIndices(index: number): number[] {
    const { rows, cols } = this.gameState;
    const r = Math.floor(index / cols);
    const c = index % cols;
    const adj: number[] = [];

    if (r > 0) adj.push((r - 1) * cols + c); // top
    if (r < rows - 1) adj.push((r + 1) * cols + c); // bottom
    if (c > 0) adj.push(r * cols + (c - 1)); // left
    if (c < cols - 1) adj.push(r * cols + (c + 1)); // right

    return adj;
  }

  private hasValidMove(index: number): boolean {
    const board = this.gameState.board;
    const adjIndices = this.getAdjacentIndices(index);

    for (const shape of SHAPES) {
      for (const color of COLORS) {
        let valid = true;
        for (const adj of adjIndices) {
          const adjCell = board[adj];
          if (adjCell.shape === shape || adjCell.color === color) {
            valid = false;
            break;
          }
        }
        if (valid) return true;
      }
    }

    return false;
  }

  public handleClick(index: number): boolean {
    if (this.gameState.isGameOver) return false;

    const board = this.gameState.board;
    const cell = board[index];

    if (cell.cooldown > 0) return false; // cannot click, on cooldown

    if (!this.hasValidMove(index)) {
      // No valid combination → game over
      this.gameState.isGameOver = true;
      return false;
    }

    // Randomly pick a valid combination
    const adjIndices = this.getAdjacentIndices(index);
    let newCell: Cell | null = null;

    for (let attempts = 0; attempts < 100; attempts++) {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      const valid = adjIndices.every(
        (adj) =>
          board[adj].shape !== shape && board[adj].color !== color
      );

      if (valid) {
        newCell = { shape, color, cooldown: 3 };
        break;
      }
    }

    if (!newCell) {
      // Could not find valid combination after 100 attempts → game over
      this.gameState.isGameOver = true;
      return false;
    }

    // Update the clicked cell
    board[index] = newCell;

    // Decrease cooldowns for all cells
    board.forEach((c) => {
      if (c.cooldown > 0 && c !== newCell) c.cooldown -= 1;
    });

    // Update score and turn
    this.gameState.score += 1;
    this.gameState.turn += 1;

    return true;
  }
}
