import { Ship } from "./ship.js";

const player1Ships = [new Ship(5),new Ship(4), new Ship(3),new Ship(3),new Ship(2)];
const player2Ships = [new Ship(5),new Ship(4), new Ship(3),new Ship(3),new Ship(2)];

export class GameBoard {
    
    constructor(){
        this.boardSize=10;
        this.coordinates= new Map();
        this.AttackStorage = [];
        this.player1board=this.createBoard();
        this.player2board=this.createBoard();
    }

    createBoard(){
        const board = [];
        for (let i=0;i<this.boardSize;i++){
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
            let arr=[];
            for (let i=0;i<ship.length;i++){
                this.player1board[x+i][y]=ship.length;  
                arr.push([x+1,y]); 
            }

            this.AddShipCoords(ship,arr);
        }
    }

    AddShipCoords(ship,arr){
        this.coordinates.set(ship,arr);
    }

    receiveAttack(coords){
        for(let i=0;i<this.AttackStorage.length;i++){
            if(coords === this.AttackStorage[i]){
                return false;
            }
        }
        this.coordinates.forEach((array,key) => {
            array.forEach((value,index) => {
                if(value===coords){
                    key.Hit();
                    array.splice(index,1);
                    this.checkSunk();
                }
            });
        });
        this.AttackStorage.push(coords);
    }

    checkSunk(){
        this.coordinates.forEach((array,key) => {
            if(array.length > 0){
                return false;
            }
            return true;
        });
    }
}