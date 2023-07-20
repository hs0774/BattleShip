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
}

const griddiv = document.querySelector('.two');
const cell = griddiv.querySelectorAll('.cell');
const playerWinner = document.querySelector('.playerNum');
function cellClickListener(e) {
    const clickedCell = e.target;
    const clickedCoord = clickedCell.getAttribute('data-coordinate');

    // const player2Loss = player2.gameOver();
    // const player1Loss = player1.gameOver();

    player2.attack(JSON.parse(clickedCoord), 'two');
    player1.makeRandomAttack('one');

    clickedCell.removeEventListener('click', cellClickListener);
    gameloop();
}

cell.forEach((cell) => {
    cell.addEventListener('click', cellClickListener);
});

function gameloop(){
    const player2Loss = player2.gameOver();
    const player1Loss = player1.gameOver();
    if (player1Loss){
        playerWinner.textContent='Player 2 wins';
        cell.forEach((cell) => {
            cell.removeEventListener('click', cellClickListener);
        });
    }
    else if(player2Loss){
        playerWinner.textContent='Player 1 wins';
        cell.forEach((cell) => {
            cell.removeEventListener('click', cellClickListener);
        });
    }
}
