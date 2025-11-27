export type Shape = "triangle" | "square" | "diamond" | "circle";
export type Color = "red" | "green" | "blue" | "yellow";

export interface Cell {
  shape: Shape;
  color: Color;
  cooldown: number;
}

export interface GameState {
  board: Cell[];
  rows: number;
  cols: number;
  score: number;
  turn: number;
  isGameOver: boolean;
}

export interface ClientJoinPayload {
  playerId?: string;
}

export interface SocketEvents {
  // Client → Server
  join: ClientJoinPayload;
  action: { cellIndex: number };

  // Server → Client
  state_snapshot: GameState;
  state_patch: Partial<GameState>;
  action_ack: { ok: boolean };
}
