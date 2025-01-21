const Gameboard = (function() {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const getBoard = () => board;

  const markSpot = function(spot, player) {
    //convert the spot (ex "3,2") into integer row and column values
    let [row, col] = spot.split(",").map(x => parseInt(x, 10));
    board[row][col].addToken(player);
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
