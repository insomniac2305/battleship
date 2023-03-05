import ship from "./ship";

test("Ship is sunk when hit length times", () => {
  const testShip = ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});

test("Ship is not sunk when hit less than length times", () => {
  const testShip = ship(2);
  testShip.hit();
  expect(testShip.isSunk()).toBe(false);
});

test("Ship is still sunk when hit more than length times", () => {
  const testShip = ship(2);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
