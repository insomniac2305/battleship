import game from "./game";
import "./styles.css";

const newGame = game();
newGame.init();

function fireShot(col ,row) {
  newGame.takeTurn(col, row);
  const gameboard = document.querySelector(".gameboard.inactive");
  // eslint-disable-next-line no-use-before-define
  addBoardListeners(gameboard);
}

function addBoardListeners(gameboard) {
  const columns = gameboard.querySelectorAll(".col[data-col]");
  columns.forEach((col) => {
    const rows = col.querySelectorAll(".row[data-row]:not(.hit, .missed)");
    rows.forEach((row) => {
      row.addEventListener("click", fireShot.bind(this, col.dataset.col, row.dataset.row));
    });
  });
}

addBoardListeners(document.querySelector(".gameboard.inactive"));