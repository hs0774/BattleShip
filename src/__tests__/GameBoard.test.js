import { GameBoard } from "../GameBoard.js";
import { Ship } from "../ship.js";
//import { Player } from "../player.js";

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
// test('This tests the various cases that receiveAttack', () => {

// });


//checkSunk() test
test('Checks if all ships are sunk', () => {

    const gameBoard = new GameBoard();
    gameBoard.coordinates.set(Ship[0],[]);

    const result = gameBoard.checkSunk();
    expect(result).toBe(true);

});

test('Checks if all ships are not sunk', () => {

    const gameBoard = new GameBoard();
    gameBoard.coordinates.set(Ship[0],[1,1]);

    const result = gameBoard.checkSunk();
    expect(result).toBe(false);

});


// receiveAttack(coords){
//     for(let i=0;i<this.AttackStorage.length;i++){
//         if(coords === this.AttackStorage[i]){
//             return false;
//         }
//     }
//     this.coordinates.forEach((array,key) => {
//         array.forEach((value,index) => {
//             if(value===coords){
//                 key.Hit();
//                 array.splice(index,1);
//                 this.checkSunk();
//             } else {
//                 this.missedAttacks.push(coords);
//             }
//         });
//     });
//     this.AttackStorage.push(coords);
// }

