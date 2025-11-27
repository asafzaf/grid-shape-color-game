import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameState, Cell as CellType } from "shared";
import { GameOver } from "../GameOver/GameOver";
import Cell from "../Cell/Cell";
import styles from "./Board.module.css";

type Props = {
  state: GameState;
  onCellClick: (index: number) => void;
};

const Board: React.FC<Props> = ({ state, onCellClick }) => {


  if (!state) return <div>Loading...</div>;

  const { board, rows, cols } = state;

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateRows: `repeat(${rows}, 80px)`,
        gridTemplateColumns: `repeat(${cols}, 80px)`,
      }}
    >
      {board.map((cell: CellType, idx: number) => (
        <Cell key={idx} cell={cell} index={idx} onClick={() => onCellClick(idx)} />
      ))}
    </div>
  );
};

export default Board;
