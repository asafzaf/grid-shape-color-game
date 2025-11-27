// frontend/src/socketApi.ts
import { io, Socket } from "socket.io-client";
import { CONFIG } from "../config/environment";
import { GameState } from "shared";

type StateListener = (state: GameState) => void;
type ActionAckListener = (ok: boolean) => void;

export class SocketApi {
  private socket: Socket;
  private stateListeners: StateListener[] = [];
  private actionAckListeners: ActionAckListener[] = [];

  constructor() {
    this.socket = io(CONFIG.BACKEND_URL);

    this.socket.on("state_snapshot", (state) => {
      this.stateListeners.forEach((listener) => listener(state));
    });

    this.socket.on("action_ack", ({ ok }) => {
      this.actionAckListeners.forEach((listener) => listener(ok));
    });
  }

  onStateChange(listener: StateListener) {
    this.stateListeners.push(listener);
  }

  onActionAck(listener: ActionAckListener) {
    this.actionAckListeners.push(listener);
  }

  clickCell(cellIndex: number) {
    this.socket.emit("action", { cellIndex });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export const socketApi = new SocketApi();
