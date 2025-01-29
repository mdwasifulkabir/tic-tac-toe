const Gameboard = (function() {
  const board = [];

  for(let i = 0; i < 3; i++) {
    board[i] = []
    for(let j = 0; j < 3; j++){
      board[i].push(Cell());
    }
  }

  const renderBoard = () => {
    const gameboard = document.querySelector("#gameboard");
    gameboard.innerHTML = "";

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
        if (cell.getValue() != 0) {
          cellDiv.textContent = cell.getValue();
        }
        gameboard.appendChild(cellDiv)
      });
    });
  }

  const printBoard = () => {
    const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithValues);
  };

  const getBoard = () => board;

  const markSpot = function(spot, player) {
    //convert the spot (ex "3,2") into integer row and column values
    let [row, col] = spot.split(",").map(x => parseInt(x, 10));
    board[row-1][col-1].addToken(player);
    renderBoard();
  }

  return {
    printBoard,
    getBoard,
    markSpot,
    renderBoard,
  }
})();

const GameController = (function(playerOneName = "Player One", playerTwoName = "Player Two") {
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    }
  ];
  
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`)
  };

  const checkWin  = () => {
    board = Gameboard.getBoard()
    const checkRowWin = () => {
      for (let i = 0; i < 3; i++) {
        row = board[i]
        if(row.every(cell => cell.getValue() === row[0].getValue() && cell.getValue() !== 0)) {
          return true
        }
      }
    }

    const checkColumnWin = () => {
      for(let i = 0; i < 3; i++) {
        if (
          board[0][i].getValue() !== 0 &&
          board.every(row => row[i].getValue() === board[0][i].getValue())
        ) {
          return true;
        }
      }
    }

    const checkDiagonalWin = () => {
      if (
        //left to right
        (board[0][0].getValue() !== 0 &&
        board[0][0].getValue() === board[1][1].getValue() &&
        board[1][1].getValue() === board[2][2].getValue()) ||
        //right to left
        (board[0][2].getValue() !== 0 &&
        board[0][2].getValue() === board[1][1].getValue() &&
        board[1][1].getValue() === board[2][0].getValue()) 
      ) {
        return true;
      }
    }

    if (checkRowWin() || checkColumnWin() || checkDiagonalWin()) {
      console.log(`${getActivePlayer().name} Wins`);
      return true;
    }

    return false;
  }

  const playRound = () => {
    const spot = prompt("Enter the spot: ");
    Gameboard.markSpot(spot, getActivePlayer());
    switchTurn();
    printNewRound();
  }

  return {
    getActivePlayer,
    playRound,
    checkWin,
  }
})();

function Cell() {
  let value = 0

  const addToken = (player) => {
    value = player.token
  }

  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}

while(!GameController.checkWin()) {
  GameController.playRound();
}