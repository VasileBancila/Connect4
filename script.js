let table = [];
const rows = 6, columns = 7;
const players = ['red', 'yellow'];
let activePlayer = players[0];
let gameFinished = false;
let currentCol = [5, 5, 5, 5, 5, 5, 5]; //we keep the row on each column to simulate gravity
let moves = 0;

window.onload = function gameTable() { //when loading the page we build the game board
  for (let r = 0; r < rows; ++r) { //we form a matrix
    let row = [];
    for (let c = 0; c < columns; ++c) {
      row.push(' ');
      let token = document.createElement("div");
      token.id = r.toString() + "-" + c.toString();
      token.classList.add("token");
      token.addEventListener("click", makeMove);
      document.getElementById("table").append(token);
    }
    table.push(row);
  }
}

function makeMove() { ////we make the move
  let coordinates = this.id.split("-");
  let row = parseInt(coordinates[0]);
  let col = parseInt(coordinates[1]);
  row = currentCol[col];
  if (row < 0 || gameFinished) { //if the row is less than 0, we can no longer make moves on the current column
    return;
  }
  table[row][col] = activePlayer;
  let token = document.getElementById(row.toString() + "-" + col.toString());
  if (activePlayer === players[0]) {
    token.style.backgroundColor = players[0];
  } else {
    token.style.backgroundColor = players[1];
  }
  changeTurn();
  ++moves;
  --row; //once with the movements on a column we go with the decreasing rows
  currentCol[col] = row;
  findWinnerHorizontally();
  findWinnerVertically();
  findWinnerDiagonally();
  findWinnerAntiDiagonally();
  findEqually();
}

function changeTurn() { //change the player
  if (activePlayer === players[0]) {
    activePlayer = players[1];
  } else {
    activePlayer = players[0];
  }
  messageDisplay('move');
}

function findWinnerHorizontally() {
  for (let row = 0; row < rows; ++row) {
    for (let col = 0; col < columns - 3; ++col) {
      if (table[row][col] != ' ') {
        if (table[row][col] == table[row][col + 1] && table[row][col + 1] == table[row][col + 2] &&
          table[row][col + 2] == table[row][col + 3]) {
          setWinner(row, col);
          return;
        }
      }
    }
  }
}

function findWinnerVertically() {
  for (let col = 0; col < columns; ++col) {
    for (let row = 0; row < rows - 3; ++row) {
      if (table[row][col] != ' ') {
        if (table[row][col] == table[row + 1][col] && table[row + 1][col] == table[row + 2][col] &&
          table[row + 2][col] == table[row + 3][col]) {
          setWinner(row, col);
          return;
        }
      }
    }
  }
}

function findWinnerDiagonally() {
  for (let row = 0; row < rows - 3; ++row) {
    for (let col = 0; col < columns - 3; ++col) {
      if (table[row][col] != ' ') {
        if (table[row][col] == table[row + 1][col + 1] && table[row + 1][col + 1] == table[row + 2][col + 2] &&
          table[row + 2][col + 2] == table[row + 3][col + 3]) {
          setWinner(row, col);
          return;
        }
      }
    }
  }
}

function findWinnerAntiDiagonally() {
  for (let row = 3; row < rows; ++row) {
    for (let col = 0; col < columns - 3; ++col) {
      if (table[row][col] != ' ') {
        if (table[row][col] == table[row - 1][col + 1] && table[row - 1][col + 1] == table[row - 2][col + 2] &&
          table[row - 2][col + 2] == table[row - 3][col + 3]) {
          setWinner(row, col);
          return;
        }
      }
    }
  }
}

function findEqually() {
  if (moves === 42) { //we check if it is equal
    messageDisplay('equal');
    gameFinished = true;
    return;
  }
}

function setWinner(row, col) { //I found the winning player
  messageDisplay(table[row][col]);
  gameFinished = true;
}

function messageDisplay(status) { //we display the corresponding message
  let message = document.getElementById("message");
  message.innerText = "";
  if (status === "move") {
    message.innerText = `Player ${activePlayer} to move.`;
  } else if (status === "equal") {
    message.innerHTML = "You are both equally good!";
  } else {
    message.innerText = `Player ${status} win!`;
  }
}

function reload() { //start new game
  location.reload();
}