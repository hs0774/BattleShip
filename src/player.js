import { GameBoard } from "../GameBoard.js";
import { Ship } from "../ship.js";



export class Player {
    constructor(){
        this.PlayerShips= [new Ship(5),new Ship(4),new Ship(3),new Ship(3),new Ship(2)];
    }
    attack(x,y){
        let coords = [x,y];
    }
}