import { Ship } from "./ship.js";

// const player1Ships = [new Ship(5),new Ship(4), new Ship(3),new Ship(3),new Ship(2)];
// const player2Ships = [new Ship(5),new Ship(4), new Ship(3),new Ship(3),new Ship(2)];

export class GameBoard {

    constructor(){
        this.boardSize=10;
        this.coordinates= new Map();
        this.AttackStorage = [];
        this.missedAttacks=[];
        this.playerboard=this.createBoard();
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

    placeShip(playerShips){
        for (const ship of playerShips){
            const x=0;
            const y=playerShips.indexOf(ship);
            let arr=[];
            for (let i=0;i<ship.length;i++){
                this.playerboard[x+i][y]=ship.length;  
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
                } else {
                    this.missedAttacks.push(coords);
                }
            });
        });
        this.AttackStorage.push(coords);
    }

    checkSunk(){
        let allsunk = true;
        this.coordinates.forEach((array,key) => {
            if(array.length > 0){
                allsunk = false;
            }
        });
        return allsunk;
    }
}