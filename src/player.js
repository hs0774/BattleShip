import { GameBoard } from "./GameBoard.js";
import { Ship } from "./ship.js";

export class Player {
    constructor(){
        this.gameBoard=new GameBoard();
        this.PlayerShips= [new Ship(5),new Ship(4),new Ship(3),new Ship(3),new Ship(2)];
    }
    attack(x,y){
        let coords = [x,y];
        this.gameBoard.receiveAttack(coords);
    }
    makeRandomAttack(){
        const boardSize = this.gameBoard.boardSize;
        let isDuplicate = true;
        let coords;

        while(isDuplicate){
            const x = Math.floor(Math.random()*boardSize);
            const y = Math.floor(Math.random()*boardSize);
            coords = [x,y];
            isDuplicate=false;
            
            for(let i=0;i<this.gameBoard.AttackStorage.length;i++){
                if(JSON.stringify(coords) === JSON.stringify(this.gameBoard.AttackStorage[i])){
                    isDuplicate=true;
                    break;
                }
            }
        }
        this.gameBoard.receiveAttack(coords);
    }
    gameOver(){
        return this.gameBoard.checkSunk();
    }

}

//the game loop will look like this 
// player1 attacks  like x=0,y=1 and does  player2.attack(x,y)
// player2 attacks like player1.randomattack()

//only the computer needs to check for duplicate attacks because i will disable event
//listeners on the computers grid so the user cant attack them again 