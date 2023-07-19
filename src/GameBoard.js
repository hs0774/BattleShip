import { domfunction } from "./gameboardDom.js";
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
            for(let j=0;j<this.boardSize;j++) {
               row.push(0);
            }
            board.push(row);
        }
        return board;
    }

    placeShip(playerShips){
        for (const ship of playerShips){
            let x=0;
            const y=playerShips.indexOf(ship);
            let arr=[];
            for (let i=0;i<ship.length;i++){
                this.playerboard[x+i][y]=ship.length;  
                arr.push([x+i,y]); 
            }
            x++;
            this.AddShipCoords(ship,arr);
        }
    }

    AddShipCoords(ship, arr) {
        this.coordinates.set(ship, arr);
    } 

    receiveAttack(coords,word){
    //  console.log(coords,word);
        for(let i=0; i<this.AttackStorage.length; i++){
            if(JSON.stringify(coords) == JSON.stringify(this.AttackStorage[i])){
                return false;
            }
        }
        const container = document.querySelector('.container');
        const grid = container.querySelector(`.${word}`);
        let hitShip=false;
        this.coordinates.forEach((array,key) => {
            array.forEach((value,index) => {
                if(value[0] === coords[0] && value[1] === coords[1]){
                    key.hit();
                    array.splice(index,1);
                    this.checkSunk();
                    hitShip=true;
                    const cell = grid.querySelectorAll('.cell');
                    cell.forEach((cell) => {
                      const celly = JSON.parse(cell.getAttribute('data-coordinate'));
                        if(celly[0]=== coords[0] && celly[1] === coords[1]) {
                            cell.style.backgroundColor='red';
                        }
                    });
                }
            });
        });

        if(!hitShip){
            this.missedAttacks.push(coords);
            const cell = grid.querySelectorAll('.cell');
            cell.forEach((cell) => {
                const celly = JSON.parse(cell.getAttribute('data-coordinate'));
                if(celly[0]=== coords[0] && celly[1] === coords[1]) {
                    cell.style.backgroundColor='blue';
                }
            });
        }
        this.AttackStorage.push(coords);
    }

    checkSunk(){
        let allsunk = true;
        this.coordinates.forEach((array) => {
            if(array.length > 0){
                allsunk = false;
                return;
            }
        });
        return allsunk;
    }

}