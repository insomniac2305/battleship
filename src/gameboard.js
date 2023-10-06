import ship from "./ship";

export default () => {
  const board = [];

  for (let col = 0; col < 10; col += 1) {
    board[col] = [];
    for (let row = 0; row < 10; row += 1) {
      board[col][row] = {
        ship: undefined,
        hit: false,
        missed: false,
      };
    }
  }

  const getBoard = () => board;

  const placeShip = (col, row, length, horizontal = false) => {
    if (col < 0 || col > 9 || row < 0 || row > 9
      || (horizontal && col + length > 9)
      || (!horizontal && row + length > 9)) {
      return false;
    }

    const newShip = ship(length);

    for (let i = 0; i < length; i += 1) {
      let spanCol = horizontal ? i : 0;
      let spanRow = horizontal ? 0 : i;

      if (board[col + spanCol][row + spanRow]?.ship !== undefined) {
        // Rollback
        for (let j = i - 1; j >= 0; j -= 1) {
          spanCol = horizontal ? j : 0;
          spanRow = horizontal ? 0 : j;
          board[col + spanCol][row + spanRow].ship = undefined;
        }
        return false;
      }

      board[col + spanCol][row + spanRow].ship = newShip;
    }

    return newShip;
  };

  const placeRandomShip = (length) => {
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);
    const horizontal = Math.random() > 0.5;
    placeShip(col, row, length, horizontal) || placeRandomShip(length);
  };

  const receiveAttack = (col, row) => {
    if (col < 0 || col > 9 || row < 0 || row > 9) {
      return false;
    }

    const attackedShip = board[col][row].ship;
    if (attackedShip) {
      board[col][row].hit = true;
      attackedShip.hit();
      return "hit";
    }
    board[col][row].missed = true;
    return "miss";
  };

  const allShipsSunk = () => {
    const unsunkShips = board.flat().filter((field) => field.ship && !field.ship.isSunk());
    return unsunkShips.length === 0;
  };

  return { getBoard, placeShip, placeRandomShip, receiveAttack, allShipsSunk };
};
