import React from "react";
import "./selector.css";

function Selector(props) {
  const { turnSelected, guestUserTurn, isGameOver, whoWon } = props;
  const onclickSelect = (event) => {
    const { onClickSelector } = props;
    const turn = event.target.innerText;
    onClickSelector && onClickSelector(turn);
  };

  const onResetHandle = () => {
    const { resetHandle } = props;
    resetHandle && resetHandle();
  };

  return (
    <>
      <div className="selector-container">
        <h4>Select turn:</h4>
        <div
          className={
            turnSelected == "X" ? "selector-child-selected" : "selector-child"
          }
          onClick={onclickSelect}
        >
          X
        </div>
        <div
          className={
            turnSelected == "O" ? "selector-child-selected" : "selector-child"
          }
          onClick={onclickSelect}
        >
          O
        </div>
        <div className="reset" onClick={onResetHandle}>
          RESET
        </div>
      </div>
      <div className="turn-selector">{!isGameOver?(guestUserTurn ? "Your Turn: ": "PC Turn: "):" "}</div>
      {isGameOver&& <div className="game-over">Game Over, {whoWon=="machine"?"PC Won!":(whoWon==="user"? "You Won!": "Match Draw")}</div>}
    </>
  );
}

export default Selector;
