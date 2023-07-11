import { Ship } from "./ship.js";

const player1Ships = [new Ship(5),new Ship(4), new Ship(3),new Ship(3),new Ship(2)];
const player2Ships = [new Ship(5),new Ship(4), new Ship(3),new Ship(3),new Ship(2)];

export class GameBoard {
    constructor(){
        this.boardSize=10;
        this.coordinates= new Set();
        this.player1board=this.createBoard();
        this.player2board=this.createBoard();
    }
    createBoard(){
        const board = [];
        for(let i=0;i<this.boardSize;i++){
            const row =[];
            for(let j=0;j<this.boardSize;j++){
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }
    placeShip(player1Ships){
        for (const ship of player1Ships){
            const x=0;
            const y=player1Ships.indexOf(ship);
            for(let i=0;i<ship.length;i++){
                this.AddShipCoords((x+i),y);
            }
        }
    }
    AddShipCoords(x,y){
        const coord = `${x},${y}`;
        this.coordinates.add(coord);
    }
    receiveAttack(){

    }
}