import gameboard from "./gameboard";

let testGameboard;
beforeEach(() => {
  testGameboard = gameboard();
});

describe("Place ship", () => {
  test("creates ship at x, y and returns it", () => {
    const testShip = testGameboard.placeShip(1, 1, 3);
    expect(testGameboard.getBoard()[1][1].ship).toBe(testShip);
  });

  test("creates ship at x, y and spans across length coordinates", () => {
    const testShip = testGameboard.placeShip(1, 1, 3);
    expect(testGameboard.getBoard()[1][1].ship).toBe(testShip);
    expect(testGameboard.getBoard()[1][2].ship).toBe(testShip);
    expect(testGameboard.getBoard()[1][3].ship).toBe(testShip);
  });

  test("with horizontal = true creates ship at x, y and spans across length coordinates horizontally", () => {
    const testShip = testGameboard.placeShip(1, 1, 3, true);
    expect(testGameboard.getBoard()[1][1].ship).toBe(testShip);
    expect(testGameboard.getBoard()[2][1].ship).toBe(testShip);
    expect(testGameboard.getBoard()[3][1].ship).toBe(testShip);
  });

  test("checks and returns false if ship is already placed at coordinates", () => {
    testGameboard.placeShip(1, 1, 1);
    const testShipFailed = testGameboard.placeShip(1, 1, 1);
    expect(testShipFailed).toBe(false);
  });

  test("checks and returns false if ship is already placed at spanned coordinates", () => {
    testGameboard.placeShip(1, 1, 3);
    const testShipFailed = testGameboard.placeShip(1, 3, 1);
    expect(testShipFailed).toBe(false);
  });

  test("checks and returns false if coordinates out of bounds", () => {
    const testShipFailed = testGameboard.placeShip(99, 99, 1);
    expect(testShipFailed).toBe(false);
  });
});

describe("Receive Attack", () => {

  let testShip;
  beforeEach(() => {
    testShip = testGameboard.placeShip(1, 1, 3);
    testShip.hit = jest.fn(() => "hit");
  })

  test("sends hit function to ship at target coordinates", () => {
    testGameboard.receiveAttack(1, 1);
    expect(testShip.hit).toHaveBeenCalled();
  });

  test("does not send hit function when ship missed", () => {
    testGameboard.receiveAttack(2, 2);
    expect(testShip.hit).toHaveBeenCalledTimes(0);
  });

  test("records missed shot", () => {
    testGameboard.receiveAttack(2, 2);
    expect(testGameboard.getBoard()[2][2].missed).toEqual(true);
  });
});
