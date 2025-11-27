import React from "react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-box">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
};
