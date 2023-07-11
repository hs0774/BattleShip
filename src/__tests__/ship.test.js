import { Ship } from "../ship.js";

test('testing it hits are added when hit', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.numOfHits).toBe(1);
});

test('testing if it gets sunk', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
});