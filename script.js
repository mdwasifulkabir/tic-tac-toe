const Gameboard = (function() {
  const board = [];

  for(let i = 0; i < 3; i++) {
    board[i] = []
    for(let j = 0; j < 3; j++){
      board[i].push(Cell());
    }
  }

  const printBoard = () => {
    const board = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(board);
  };

  const getBoard = () => board;

  const markSpot = function(spot, player) {
    //convert the spot (ex "3,2") into integer row and column values
    let [row, col] = spot.split(",").map(x => parseInt(x, 10));
    board[row][col].addToken(player);
  }

  return {
    printBoard,
    getBoard,
    markSpot
  }
})();

const GameController = (function(playerOneName = "Player One", playerTwoName = "Player Two") {
  const players = [
    {
      name: playerOneName,
      token: X,
    },
    {
      name: playerTwoName,
      token: O,
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

  const playRound = () => {
    const spot = prompt("Enter the spot: ");
    Gameboard.markSpot(spot, getActivePlayer());
    switchTurn();
    printNewRound();
  }

  return {
    getActivePlayer,
    playRound,
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

GameController.playRound();