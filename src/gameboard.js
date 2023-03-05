import ship from "./ship";

export default () => {
  const board = [[], [], [], [], [], [], [], [], [], []];

  const getBoard = () => board;

  const placeShip = (col, row, length, horizontal = false) => {
    if (col < 0 || col > 9 || row < 0 || row > 9) {
      return false;
    }

    const newShip = ship(length);

    for (let i = 0; i < length; i += 1) {
      const spanCol = horizontal ? i : 0;
      const spanRow = horizontal ? 0 : i;

      if (board[col + spanCol][row + spanRow] !== undefined) {
        return false;
      }

      board[col + spanCol][row + spanRow] = newShip;
    }

    return newShip;
  };

  return { getBoard, placeShip };
};
