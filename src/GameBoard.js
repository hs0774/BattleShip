export class GameBoard {
    constructor(){
        this.boardSize=10;
        this.player1board=this.createBoard();
        this.player2board=this.createBoard();
    }
    createBoard(){
        board = [];
        for(let i=0;i<this.boardSize;i++){
            const row =[];
            for(let j=0;j<this.boardSize;j++){
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }
}