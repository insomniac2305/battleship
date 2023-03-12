import display from "./display";
import gameboard from "./gameboard";
import player from "./player";

export default () => {
  let player1;
  let player2;
  let activePlayer;
  let inactivePlayer;

  const init = () => {
    player1 = player("Player One", gameboard());
    player2 = player("Player Two", gameboard());

    player1.board.placeRandomShip(2);
    player1.board.placeRandomShip(3);
    player1.board.placeRandomShip(3);
    player1.board.placeRandomShip(4);

    player2.board.placeRandomShip(2);
    player2.board.placeRandomShip(3);
    player2.board.placeRandomShip(3);
    player2.board.placeRandomShip(4);

    activePlayer = player1;
    inactivePlayer = player2;

    display.showBoards(activePlayer, inactivePlayer);
  };

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
      init();
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

  return { init, takeTurn };
};
