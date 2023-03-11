import display from "./display";
import gameboard from "./gameboard";
import player from "./player";

export default () => {
  const player1 = player("Player One", gameboard());
  const player2 = player("Player Two", gameboard());

  let activePlayer = player1;
  let inactivePlayer = player2;

  player1.placeShip(1, 1, 3, true);
  player1.placeShip(3, 5, 2, false);
  player1.placeShip(7, 2, 4, false);
  player1.placeShip(8, 8, 2, true);

  player2.placeShip(3, 2, 3, true);
  player2.placeShip(5, 8, 2, true);
  player2.placeShip(6, 3, 4, false);
  player2.placeShip(8, 5, 2, true);

  const switchActivePlayer = () => {
    [activePlayer, inactivePlayer] = [inactivePlayer, activePlayer];
    display.showBoards(activePlayer, inactivePlayer);
  };

  const takeTurn = (col, row) => {
    if (!activePlayer.attack(inactivePlayer, col, row)) {
      return display.invalidMove();
    }

    if (inactivePlayer.board.allShipsSunk()) {
      return display.gameOver(activePlayer);
    }

    return switchActivePlayer();
  };

  return { takeTurn };
};
