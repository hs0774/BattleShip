export class Ship {
    constructor(length,numOfHits=0,sunk=false){
       this.length=length;
       this.numOfHits=numOfHits;
       this.sunk=sunk;
    }
    hit(){
        if(this.numOfHits!==this.length){
         this.numOfHits++;
        }
        if(this.numOfHits===this.length){
            this.isSunk();
        }
    }
    isSunk(){
        this.sunk=true;
    }
}