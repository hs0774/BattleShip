import { GameBoard } from "../GameBoard.js";
import { Ship } from "../ship.js";

//createboard() test
test('Test to see if board is 10x10', () => {

    const gameBoard = new GameBoard();
    const board = gameBoard.createBoard();
    
    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10); 

});

//placeShip() test
//will create logic for uniqueness after player class or during styling
test('This tests if the ships are placed properly for now in a default location', () => {

    const gameBoard = new GameBoard(); 
    const playerShips = [new Ship(3),new Ship(4)];
    gameBoard.placeShip(playerShips);

    //ship 1 
    expect(gameBoard.playerboard[0][0]).toBe(playerShips[0].length);
    expect(gameBoard.playerboard[1][0]).toBe(playerShips[0].length);
    expect(gameBoard.playerboard[2][0]).toBe(playerShips[0].length);

    //ship 2
    expect(gameBoard.playerboard[0][1]).toBe(playerShips[1].length);
    expect(gameBoard.playerboard[1][1]).toBe(playerShips[1].length);
    expect(gameBoard.playerboard[2][1]).toBe(playerShips[1].length);
    expect(gameBoard.playerboard[3][1]).toBe(playerShips[1].length);

});

//addShipCoords() tests
test('This tests if coords are added', () => {

    const gameBoard = new GameBoard();
    const playerShips = [new Ship(3),new Ship(4)];
    const shipCoords = [[0,0],[1,0],[2,0]];
    gameBoard.AddShipCoords(playerShips[1],shipCoords);

    const addedCoords = gameBoard.coordinates.get(playerShips[1]);
    expect(addedCoords).toEqual(shipCoords);

});

//receiveAttack() test
describe('This tests the various cases that receiveAttack', () => {

    test('Checks if a repeat coord is passed' , () => {

        const gameBoard = new GameBoard();
        gameBoard.AttackStorage=[[0,0],[0,1],[0,2]];
        let coords = [0,1];
        const result = gameBoard.receiveAttack(coords);
        expect(result).toBe(false);
    });

    //we should test for a hit and for a miss 
    test('this tests if a coord hits and what happens when it does', () => {

        const gameBoard = new GameBoard();
        const playerShips = [new Ship(3),new Ship(4)];
        gameBoard.placeShip(playerShips);
        let coords = [3,1];
        gameBoard.receiveAttack(coords);
        expect(playerShips[1].numOfHits).toBe(1);
        expect(gameBoard.coordinates).not.toContainEqual(coords);
        expect(gameBoard.AttackStorage).toContainEqual(coords);
        expect(gameBoard.missedAttacks).not.toContainEqual(coords);
    });
    
    test('this tests if a unique coord misses', () => {

        const gameBoard = new GameBoard();
        const playerShips = [new Ship(3),new Ship(4)];
        gameBoard.placeShip(playerShips);
        let coords = [8,8];
        gameBoard.receiveAttack(coords);
        expect(playerShips[0].numOfHits).toBe(0);
        expect(playerShips[1].numOfHits).toBe(0);
        expect(gameBoard.AttackStorage).toContainEqual(coords);
        expect(gameBoard.missedAttacks).toContainEqual(coords);
    });
});

//checkSunk() test
describe('This tests the various cases of checkSunk()', () => {

    test('Checks if all ships are sunk', () => {

        const gameBoard = new GameBoard();
        const ships = [new Ship(3),new Ship(2)];
        gameBoard.coordinates.set(ships[1],[]);

        const result = gameBoard.checkSunk();
        expect(result).toBe(true);

    });

    test('Checks if all ships are not sunk', () => {

        const gameBoard = new GameBoard();
        const ships = [new Ship(3),new Ship(2)];
        gameBoard.coordinates.set(ships[0],[1,1]);

        const result = gameBoard.checkSunk();
        expect(result).toBe(false);

    });

    test('Checks if for all ships not just one sunk ship', () => {

        const gameBoard = new GameBoard();
        const ships = [new Ship(1),new Ship(2)]
        gameBoard.coordinates.set(ships[0],[]);
        gameBoard.coordinates.set(ships[1],[1,1]);

        const result = gameBoard.checkSunk();
        expect(result).toBe(false);
    });
});
