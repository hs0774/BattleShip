import { GameBoard } from "../GameBoard.js";
import { Ship } from "../ship.js";

test('Test to see if board is 10x10', () => {
    const gameBoard = new GameBoard();
    const board = gameBoard.createBoard();
    
    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10); 
});

//will create logic for uniqueness after player class or during styling
test('This tests if the ships are placed properly for now in a default location', () => {
    const gameBoard = new GameBoard(); 
    const player1Ships = [new Ship(3),new Ship(4)];
    gameBoard.placeShip(player1Ships);

    //ship 1 
    expect(gameBoard.player1board[0][0]).toBe(player1Ships[0].length);
    expect(gameBoard.player1board[1][0]).toBe(player1Ships[0].length);
    expect(gameBoard.player1board[2][0]).toBe(player1Ships[0].length);

    //ship 2
    expect(gameBoard.player1board[0][1]).toBe(player1Ships[1].length);
    expect(gameBoard.player1board[1][1]).toBe(player1Ships[1].length);
    expect(gameBoard.player1board[2][1]).toBe(player1Ships[1].length);
    expect(gameBoard.player1board[3][1]).toBe(player1Ships[1].length);

});

test('This tests if coords are added', () => {
    const gameBoard = new GameBoard();
    const player1Ships = [new Ship(3),new Ship(4)];
    const shipCoords = [[0,0],[1,0],[2,0]];
    gameBoard.AddShipCoords(player1Ships[1],arr);

   const addedCoords = gameBoard.coordinates.get(player1Ships[1]);
   expect(addedCoords).toEqual(shipCoords);
});

test()