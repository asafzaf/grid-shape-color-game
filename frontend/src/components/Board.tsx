import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameState, Cell } from "shared";
import { GameOver } from "./GameOver";

const BACKEND_URL = "http://localhost:3000";

const Board: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    const s = io(BACKEND_URL);
    setSocket(s);

    s.emit("join");

    s.on("state_snapshot", (gameState: GameState) => {
      setState(gameState);
    });

    s.on("state_patch", (patch: Partial<GameState>) => {
      setState((prev) => ({ ...prev!, ...patch }));
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const handleClick = (index: number) => {
    if (!socket) return;
    socket.emit("action", { cellIndex: index });
  };

  if (!state) return <div>Loading...</div>;

  const { board, rows, cols } = state;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 80px)`,
        gap: "5px",
      }}
    >
      {board.map((cell: Cell, idx: number) => (
        <button
          key={idx}
          style={{
            width: 80,
            height: 80,
            backgroundColor: cell.color,
            cursor: cell.cooldown > 0 ? "not-allowed" : "pointer",
            opacity: cell.cooldown > 0 ? 0.5 : 1,
          }}
          onClick={() => handleClick(idx)}
          disabled={cell.cooldown > 0}
        >
          {cell.shape}
          {cell.cooldown > 0 && <div>CD:{cell.cooldown}</div>}
        </button>
      ))}
      {state.isGameOver && (
        <GameOver
          score={state.score}
          onRestart={() => {
            window.location.reload(); // simple restart
          }}
        />
      )}
    </div>
  );
};

export default Board;
