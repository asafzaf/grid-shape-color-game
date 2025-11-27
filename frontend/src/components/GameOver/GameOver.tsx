import React from "react";
import styles from "./GameOver.module.css";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className={styles.gameOverOverlay}>
      <div className={styles.gameOverBox}>
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
};
