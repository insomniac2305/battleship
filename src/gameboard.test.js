import ship from "./ship";
import gameboard from "./gameboard";

jest.mock("./ship", () => jest.fn(() => "Mock Ship"));

test("Place ship calls ship factory with length", () => {
  const testGameboard = gameboard();
  testGameboard.placeShip(1, 1, 3);
  expect(ship).toHaveBeenCalledWith(3);
});

test("Place ship creates ship at x, y and returns it", () => {
  const testGameboard = gameboard();
  const testShip = testGameboard.placeShip(1, 1, 3);
  expect(testGameboard.getBoard()[1][1]).toBe(testShip);
});

test("Place ship creates ship at x, y and spans across length coordinates", () => {
  const testGameboard = gameboard();
  const testShip = testGameboard.placeShip(1, 1, 3);
  expect(testGameboard.getBoard()[1][1]).toBe(testShip);
  expect(testGameboard.getBoard()[1][2]).toBe(testShip);
  expect(testGameboard.getBoard()[1][3]).toBe(testShip);
});

test("Place ship with horizontal = true creates ship at x, y and spans across length coordinates horizontally", () => {
  const testGameboard = gameboard();
  const testShip = testGameboard.placeShip(1, 1, 3, true);
  expect(testGameboard.getBoard()[1][1]).toBe(testShip);
  expect(testGameboard.getBoard()[2][1]).toBe(testShip);
  expect(testGameboard.getBoard()[3][1]).toBe(testShip);
});

test("Place ship checks and returns false if ship is already placed at coordinates", () => {
  const testGameboard = gameboard();
  testGameboard.placeShip(1, 1, 1);
  const testShipFailed = testGameboard.placeShip(1, 1, 1);
  expect(testShipFailed).toBe(false);
});

test("Place ship checks and returns false if ship is already placed at spanned coordinates", () => {
  const testGameboard = gameboard();
  testGameboard.placeShip(1, 1, 3);
  const testShipFailed = testGameboard.placeShip(1, 3, 1);
  expect(testShipFailed).toBe(false);
});

test("Place ship checks and returns false if coordinates out of bounds", () => {
  const testGameboard = gameboard();
  const testShipFailed = testGameboard.placeShip(99, 99, 1);
  expect(testShipFailed).toBe(false);
});
