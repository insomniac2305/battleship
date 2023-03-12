import display from "./display";
import gameboard from "./gameboard";
import player from "./player";

export default () => {
  const player1 = player("Player One", gameboard());
  const player2 = player("Player Two", gameboard());

  let activePlayer = player1;
  let inactivePlayer = player2;

  player1.board.placeShip(1, 1, 3, true);
  player1.board.placeShip(3, 5, 2, false);
  player1.board.placeShip(7, 2, 4, false);
  player1.board.placeShip(8, 8, 2, true);

  player2.board.placeShip(3, 2, 3, true);
  player2.board.placeShip(5, 8, 2, true);
  player2.board.placeShip(6, 3, 4, false);
  player2.board.placeShip(8, 5, 2, true);

  display.showBoards(activePlayer, inactivePlayer);

  const switchActivePlayer = () => {
    [activePlayer, inactivePlayer] = [inactivePlayer, activePlayer];
  };

  const takeTurn = (col, row) => {
    const attackResult = activePlayer.attack(inactivePlayer, col, row);
    if (!attackResult) {
      display.invalidMove();
    }

    if (attackResult === "hit" && inactivePlayer.board.allShipsSunk()) {
      display.gameOver(activePlayer);
    }

    if (attackResult === "miss") {
      display.missedShot();
      switchActivePlayer();
    }

    if (attackResult === "hit") {
      display.hitShot();
    }

    display.showBoards(activePlayer, inactivePlayer);
    return attackResult;
  };

  return { takeTurn };
};
