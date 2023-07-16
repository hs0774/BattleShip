import { Player } from "../player.js";

//tests attack()
test('This tests the attack method for player', () => {
    const player = new Player()
    player.gameBoard.placeShip(player.PlayerShips);
    player.attack(0,0);
    expect(player.PlayerShips[0].numOfHits).toBe(1);
});

//tests makerandomAttack()
test('This tests the random attack for the player', () => {
    const player = new Player();
    player.gameBoard.placeShip(player.PlayerShips);
    player.makeRandomAttack();
    const latestAttack = player.gameBoard.AttackStorage[player.gameBoard.AttackStorage.length-1];
    expect(player.gameBoard.AttackStorage).toContainEqual(latestAttack);
});

describe('This tests the two scenarios of game over', () => {
    
    test('This tests if game is not over ', () => {
        const player = new Player();
        expect(player.gameOver()).toBe(true);
    });

    test('This tests if game is over', () => {
        const player = new Player();
        player.gameBoard.placeShip(player.PlayerShips);

        player.gameBoard.coordinates.forEach((array,key) => {
            array.forEach((value,index) => {
                array.splice(index,1);
            });
        });

        expect(player.gameOver()).toBe(false);
    });
});    