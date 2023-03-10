import ship from "./ship";

export default () => {
  const board = [];

  for (let col = 0; col < 10; col += 1) {
    board[col] = [];
    for (let row = 0; row < 10; row += 1) {
      board[col][row] = {
        ship: undefined,
        missed: false,
      };
    }
  }

  const getBoard = () => board;

  const placeShip = (col, row, length, horizontal = false) => {
    if (col < 0 || col > 9 || row < 0 || row > 9) {
      return false;
    }

    const newShip = ship(length);

    for (let i = 0; i < length; i += 1) {
      const spanCol = horizontal ? i : 0;
      const spanRow = horizontal ? 0 : i;

      if (board[col + spanCol][row + spanRow].ship !== undefined) {
        return false;
      }

      board[col + spanCol][row + spanRow].ship = newShip;
    }

    return newShip;
  };

  const receiveAttack = (col, row) => {
    if (col < 0 || col > 9 || row < 0 || row > 9) {
      return false;
    }

    const attackedShip = board[col][row].ship;
    if (attackedShip) {
      return attackedShip.hit();
    }
    board[col][row].missed = true;
    return true;
  };

  const allShipsSunk = () => true;

  return { getBoard, placeShip, receiveAttack, allShipsSunk };
};
