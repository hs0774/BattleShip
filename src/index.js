import { Ship } from "./ship.js";
import { GameBoard } from "./GameBoard.js";
import { Player } from "./player.js";

const player1 = new Player('one');
const player2 = new Player('two');

player1.gameBoard.placeShip(player1.PlayerShips);
player2.gameBoard.placeShip(player2.PlayerShips);

create('one');
create('two');

function create(word){
    const board = [];
    let container = document.querySelector('.container');
    let grid = document.createElement('div');
    grid.classList.add(`grid`,word);
    container.append(grid);
    for (let i=0;i<10;i++){
        const row =[];
        for(let j=0;j<10;j++) {
            const gridDiv= document.createElement('div');
            gridDiv.classList.add('cell');
            gridDiv.setAttribute('data-coordinate', `[${i},${j}]`);
            grid.appendChild(gridDiv);
            row.push(0);
           
        }
    }
    if(word==='two'){
    const griddiv = container.querySelector(`.two`);
   // const cell = griddiv.querySelectorAll('.cell');
    griddiv.addEventListener('click', (e) => {
            const clickedCell = e.target;
            const clickedCoord = clickedCell.getAttribute('data-coordinate');
            // if (grid.classList.contains('two')) {
               // player1.attack(JSON.parse(clickedCoord),'one');
             //  player1.makeRandomAttack('two');
               player2.attack(JSON.parse(clickedCoord),'two');
               player1.makeRandomAttack('one');
                
            // } else {
            //    // player1.makeRandomAttack('one');
            // }
        });
    }
    
}

// const grid = container.querySelector(`.${word}`);
// const cell = grid.querySelectorAll('.cell');