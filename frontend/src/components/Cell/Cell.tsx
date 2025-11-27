import React from "react";
import { Cell as CellType } from "shared";
import styles from "./Cell.module.css";

type Props = {
  cell: CellType;
  index: number;
  onClick: (index: number) => void;
};

const Cell: React.FC<Props> = ({ cell, index, onClick }) => {
  const shapeClass = styles[cell.shape]; // triangle, square, circle, diamond
  const cooldownClass = cell.cooldown > 0 ? styles.cooldown : "";

  return (
    <button
      style={{ backgroundColor: cell.color }}
      className={`${styles.cell} ${shapeClass} ${cooldownClass}`}
      onClick={() => onClick(index)}
      disabled={cell.cooldown > 0}
    >
      {cell.cooldown > 0 && (
        <div className={styles.cooldownOverlay}>CD:{cell.cooldown}</div>
      )}
    </button>
  );
};

export default Cell;
