import Selector from "./components/selector/selector";
import Board from "./components/board/board";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isGameOn, setGameOn] = useState(false);
  const [cell, setCell] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [strike, setStrike] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [turnSelected, setTurnSelected] = useState("X");
  const [machineTurnSelected, setMachineTurnSelected] = useState("O");
  const [guestUserTurn, setGuestUserTurn] = useState(
    turnSelected === "X" ? true : false
  );
  const [isGameOver, setGameOver] = useState(false);
  const [whoWon, setWhoWon] = useState();

  const onClickSelector = (turn) => {
    if (!isGameOver && !isGameOn) {
      if (turn == "X") {
        setTurnSelected("X");
        setMachineTurnSelected("O");
      } else {
        setTurnSelected("O");
        setMachineTurnSelected("X");
      }
    }
  };

  const onClickCell = (i, j) => {
    if (guestUserTurn && !cell[i][j]) {
      setGuestUserTurn(false);
      let updatedCell = cell;
      updatedCell[i][j] = turnSelected;
      setCell(updatedCell);
      setGameOn(true);
    }
  };

  const selectCellMachine = () => {
    let updatedCell = cell;
    setTimeout(() => {
      if (isGameOn) {
        let updated = cell;
        let cellupdated = false;
        for (let j = 0; j < 3; j++) {
          if (cell[0][j] || cell[1][j] || cell[2][j]) {
            if (cell[0][j] == cell[1][j]) {
              if (!updated[2][j]) {
                updated[2][j] = turnSelected === "X" ? "O" : "X";
                cellupdated = true;
              }
            } else if (cell[1][j] == cell[2][j]) {
              if (!updated[0][j]) {
                updated[0][j] = turnSelected === "X" ? "O" : "X";
                cellupdated = true;
              }
            } else if (cell[0][j] == cell[2][j]) {
              if (!updated[1][j]) {
                updated[1][j] = turnSelected === "X" ? "O" : "X";
                cellupdated = true;
              }
            }
            if (cellupdated) {
              setCell(updated);
              setGuestUserTurn(true);
              return;
            }
          }
        }
  
        for (let i = 0; i < 3; i++) {
          if (cell[i][0] || cell[i][1] || cell[i][2]) {
            if (cell[i][0] == cell[i][1]) {
              if (!updated[i][2]) {
                updated[i][2] = turnSelected === "X" ? "O" : "X";
                cellupdated = true;
              }
            } else if (cell[i][1] == cell[i][2]) {
              if (!updated[i][0]) {
                updated[i][0] = turnSelected === "X" ? "O" : "X";
                cellupdated = true;
              }
            } else if (cell[i][0] == cell[i][2]) {
              if (!updated[i][1]) {
                updated[i][1] = turnSelected === "X" ? "O" : "X";
                cellupdated = true;
              }
            }
            if (cellupdated) {
              setCell(updated);
              setGuestUserTurn(true);
              return;
            }
          }
        }
  
        if (
          cell[0][0] == cell[1][1] ||
          cell[1][1] == cell[2][2] ||
          cell[0][2] == cell[1][1] ||
          cell[1][1] == cell[2][0]
        ) {
          if (cell[0][0] == cell[1][1]) {
            if (!updated[2][2]) {
              updated[2][2] = turnSelected === "X" ? "O" : "X";
              cellupdated = true;
            }
          } else if (cell[1][1] == cell[2][2]) {
            if (!updated[0][0]) {
              updated[0][0] = turnSelected === "X" ? "O" : "X";
              cellupdated = true;
            }
          } else if (cell[0][2] == cell[0][0]) {
            if (!updated[1][1]) {
              updated[1][1] = turnSelected === "X" ? "O" : "X";
              cellupdated = true;
            }
          } else if (cell[0][2] == cell[1][1]) {
            if (!updated[2][0]) {
              updated[2][0] = turnSelected === "X" ? "O" : "X";
              cellupdated = true;
            }
          } else if (cell[1][1] == cell[0][2]) {
            if (!updated[0][2]) {
              updated[0][2] = turnSelected === "X" ? "O" : "X";
              cellupdated = true;
            }
          } else if (cell[0][0] == cell[0][2]) {
            if (!updated[1][1]) {
              updated[1][1] = turnSelected === "X" ? "O" : "X";
              cellupdated = true;
            }
          }
          if (cellupdated) {
            setCell(updated);
            setGuestUserTurn(true);
            return;
          }
        }
  
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (!updatedCell[i][j]) {
              updatedCell[i][j] = turnSelected === "X" ? "O" : "X";
              setCell(updatedCell);
              setGuestUserTurn(true);
              return;
            }
          }
        }
      }
    }, 1200);
  };

  const resetHandle = () => {
    setCell([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setStrike([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setGameOver(false);
    setGameOn(false);
    setTurnSelected("X");
    setMachineTurnSelected("O");
    setGuestUserTurn(turnSelected=="X"? true: false);
    setWhoWon();
  };

  const checkStrike = () => {
    //column strike check
    let updatedStrike = strike;
    for (let j = 0; j < 3; j++) {
      if (cell[0][j] && cell[1][j] && cell[2][j]) {
        if (cell[0][j] == cell[1][j] && cell[1][j] == cell[2][j]) {
          if (turnSelected == cell[0][j]) {
            setWhoWon("user");
          } else {
            setWhoWon("machine");
          }
          updatedStrike[0][j] = updatedStrike[1][j] = updatedStrike[2][j] = 1;
          setStrike(updatedStrike);
          return true;
        }
      }
    }

    //row strike check
    for (let i = 0; i < 3; i++) {
      if (cell[i][0] && cell[i][1] && cell[i][2]) {
        if (cell[i][0] == cell[i][1] && cell[i][1] == cell[i][2]) {
          if (turnSelected == cell[i][0]) {
            setWhoWon("user");
          } else {
            setWhoWon("machine");
          }
          updatedStrike[i][0] = updatedStrike[i][1] = updatedStrike[i][2] = 1;
          setStrike(updatedStrike);
          return true;
        }
      }
    }

    //diagonal strike check
    if (
      (cell[0][0] && cell[1][1] && cell[2][2]) ||
      (cell[0][2] && cell[1][1] && cell[2][0])
    ) {
      if (
        (cell[0][0] == cell[1][1] && cell[1][1] == cell[2][2]) ||
        (cell[0][2] == cell[1][1] && cell[1][1] == cell[2][0])
      ) {
        if (turnSelected == cell[1][1]) {
          setWhoWon("user");
        } else {
          setWhoWon("machine");
        }
        if (cell[0][2] == cell[1][1] && cell[1][1] == cell[2][0]) {
          updatedStrike[0][2] = updatedStrike[1][1] = updatedStrike[2][0] = 1;
        } else {
          updatedStrike[0][0] = updatedStrike[1][1] = updatedStrike[2][2] = 1;
        }
        setStrike(updatedStrike);
        return true;
      }
    }
    let isDraw;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!cell[i][j]) {
          isDraw = false;
          i = j = 3;
        } else if (i === 2 && j === 2) {
          isDraw = true;
        }
      }
    }

    if (isDraw) {
      setWhoWon("draw");
      return true;
    }

    return false;
  };

  useEffect(() => {
    const isStrike = checkStrike();
    if (isStrike) {
      setGameOver(true);
    }
    !guestUserTurn && !isGameOver && !isStrike && selectCellMachine();
  }, [guestUserTurn, isGameOver]);

  useEffect(() => {
    let cellContainsValue = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cellContainsValue = cell[i][j] ? true : false;
        i = j = 3;
      }
    }
    if (cellContainsValue && !isGameOver) {
      setGameOn(true);
    }
  }, [isGameOn, isGameOver, cell]);

  useEffect(()=>{
    if(turnSelected == 'X'){
      setGuestUserTurn(true)
    } else if(turnSelected == "O"){
      setGuestUserTurn(false)
      setGameOn(true)
    }
  },[turnSelected])


  return (
    <div className="App">
      <h2>TIC - TAC - TOE</h2>
      <Selector
        turnSelected={turnSelected}
        onClickSelector={onClickSelector}
        resetHandle={resetHandle}
        guestUserTurn={guestUserTurn}
        isGameOver={isGameOver}
        whoWon={whoWon}
      />
      <Board
        cell={cell}
        onClickCell={onClickCell}
        isGameOver={isGameOver}
        strikeCells={strike}
      />
    </div>
  );
}

export default App;
