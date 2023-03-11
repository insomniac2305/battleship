import player from "./player";

describe("Random attack", () => {
  let board1;
  let player1;
  let player2;

  beforeEach(() => {
    board1 = {};
    board1.receiveAttack = jest.fn();
    player1 = player("1", board1);
    player2 = player("2", undefined);
  });

  test("sends attack to given player board", () => {
    player2.randomAttack(player1);
    expect(player1.board.receiveAttack).toHaveBeenCalled();
  });

  test("does not attack the same coordinates twice", () => {
    player2.randomAttack(player1);
    player2.randomAttack(player1);

    expect(player1.board.receiveAttack.mock.calls[0][0]).not.toBe(player1.board.receiveAttack.mock.calls[1][0]);
    expect(player1.board.receiveAttack.mock.calls[0][1]).not.toBe(player1.board.receiveAttack.mock.calls[1][1]);
  });

  test("sends attack to int coordinates between 0 and 9", () => {
    player2.randomAttack(player1);

    const col = player1.board.receiveAttack.mock.calls[0][0];
    const row = player1.board.receiveAttack.mock.calls[0][1];

    expect(Number.isInteger(col)).toBe(true);
    expect(Number.isInteger(row)).toBe(true);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThanOrEqual(9);
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThanOrEqual(9);
  });
});
