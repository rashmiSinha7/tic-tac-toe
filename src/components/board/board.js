import React, { useState } from "react";

import "./board.css";

function Board(props) {
  const { cell, isGameOver, strikeCells} = props;

  const onClickCellGuest = (i,j)=>{
    const {onClickCell} =props
    onClickCell && !isGameOver && onClickCell(i, j)
  }

  return (

    <div className="board-container">
      <div className="board">
        {cell.map((items, i) => {
            
          return (
            <div className="board-row">
              {items.map((item, j) => {
                
                return (
                  <div className={strikeCells[i][j]?"board-cell-selected":"board-cell"} onClick={()=>{
                    onClickCellGuest(i,j)
                }}>
                    {item == "X" || item == "O" ? item : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>

  );
}

export default Board;
