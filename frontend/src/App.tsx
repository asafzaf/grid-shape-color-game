import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { GameState } from "shared";
import Board from "./components/Board/Board";
import { GameOver } from "./components/GameOver/GameOver";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
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

  function handleRestart() {
    if (!socket) return;
    socket.emit("restart");
  }
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Grid Shape Color Game</h1>
      <Board state={state!} onCellClick={handleClick} />
      {state?.isGameOver && (
        <GameOver score={state?.score || 0} onRestart={handleRestart} />
      )}
      <h3>Score: {state?.score || 0}</h3>
    </div>
  );
}

export default App;
