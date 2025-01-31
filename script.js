const Gameboard = (function() {
  const board = [];

  for(let i = 0; i < 3; i++) {
    board[i] = []
    for(let j = 0; j < 3; j++){
      board[i].push(Cell());
    }
  }

  const gameboard = document.querySelector("#gameboard");
  gameboard.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cell") || GameController.gameOver) return;
    GameController.playRound(e.target.dataset.row, e.target.dataset.col)
  });

  const renderBoard = () => {
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
  const getBoard = () => board;

  const markSpot = function(row, col, player) {
    //convert the spot (ex "3,2") into integer row and column values
    board[row][col].addToken(player);
  }

  return {
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
  let gameOver = false;

  const getActivePlayer = () => activePlayer;

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
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
      const winMsg = document.querySelector("#winMsg")
      winMsg.textContent = `${getActivePlayer().name} Wins!`
      gameOver = true;
      return true
    }

    return false;
  }

  const playRound = (row, col) => {
    Gameboard.markSpot(row, col, getActivePlayer());
    Gameboard.renderBoard();
    if(checkWin()) return
    switchTurn();
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

Gameboard.renderBoard();

