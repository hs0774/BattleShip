import { GameBoard } from "../GameBoard.js";
import { Ship } from "../ship.js";



export class Player {
    constructor(){
        this.gameBoard=new GameBoard();
        this.PlayerShips= [new Ship(5),new Ship(4),new Ship(3),new Ship(3),new Ship(2)];
    }
    attack(opponentGameBoard,x,y){
        let coords = [x,y];
        opponentGameBoard.receiveAttack(coords);
    }
    makeRandomAttack(opponentGameBoard){
        const boardSize = opponentGameBoard.boardSize;
        let duplicate = true;

        while(duplicate){
            const x = Math.floor(Math.random*boardSize);
            const y = Math.floor(Math.random*boardSize);
            let coords = [x,y];
            let duplicate=false;
            for(let i=0;i<opponentGameBoard.AttackStorage.length;i++){
                if(coords === opponentGameBoard.AttackStorage[i]){
                    duplicate=true;
                    break;
                }
            }
        }
        opponentGameBoard.receiveAttack(coords);
    }

}

//only the computer needs to check for duplicate attacks because i will disable event
//listeners on the computers grid so the user cant attack them again 