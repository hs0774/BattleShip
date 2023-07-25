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
            console.log();
            let arr=[];
            for (let i=0;i<ship.length;i++){
              //  this.playerboard[x+i][y]=ship.length;  
             // console.log([x+i,y]);
                arr.push([x+i,y]); 
            }
            x++;
            this.AddShipCoords(ship,arr);
        }
    }

    placeRandomShips(playerShips){ ///reminder to test this method
        for(const ship of playerShips){ //we loop through ships
           let arr=[];
           let x,y,placement,coords,check;
           do {
             x = Math.floor(Math.random()*10); // we get random x and y that have
             y = Math.floor(Math.random()*10); // to be greater than or equal to 0
             coords = [x,y];
             placement = Math.round(Math.random());
             check = this.checkShipCoords(ship.length,coords,placement);   
           } while((x+ship.length > 9 || y+ship.length > 9) || check === false);

           if(placement===1){
            for (let i=0;i<ship.length;i++){
                console.log(`[${x+i},${y}]`);
                arr.push([x+i,y]); 
              }
           } else {
            for (let i=0;i<ship.length;i++){
                console.log(`[${x},${y+i}]`);
                arr.push([x,y+i]); 
            }
           }
           this.AddShipCoords(ship,arr);
        }
    }

     checkShipCoords(shipLength, coords, placement) {
        for (const shipCoords of this.coordinates.values()) {
            for (const value of shipCoords) {
                let tempX = coords[0]; // Create temporary variables
                let tempY = coords[1];
                for (let i = 0; i < shipLength; i++) {
                    if (placement === 1) {
                        if (value[0] === tempX && value[1] === tempY) {
                            return false;
                        }
                        tempX++;
                    } else {
                        if (value[0] === tempX && value[1] === tempY) {
                            return false;
                        }
                        tempY++;
                    }
                }
            }
        }
        return true;
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