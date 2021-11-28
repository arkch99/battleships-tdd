const game = require("./game");

describe('Ship', () => {
	beforeAll(() => {
		testShip = game.Ship(4);
	});
	test('is created', ()=>{
		expect(testShip).not.toBeUndefined();
	}); 	
	test('has length 4', () => {
		expect(testShip.length).toBe(4);
	});
	test('is intact by default', () => {
		expect(testShip.isSunk()).toBe(false);
	});
	test('can be hit', () => {
		testShip.hit(3);
		expect(testShip.locations[3]).toBe(true);
	});
	test('is sunk when all locations hit', () => {
		for(let i = 0; i < testShip.length; i++)
		{
			testShip.hit(i);
		}		
		expect(testShip.isSunk()).toBe(true);
	});
});

describe('Gameboard', () => {
	beforeAll(() => {
		board = game.Gameboard();
	});
	test('is created', () => {
		expect(board).not.toBeUndefined();
	});
	test('has proper dimensions', () => {
		expect(board.mat.length).toBe(10) && expect(board.mat[0].length).toBe(10);
	});
	test('can place ships horizontally within bounds', () => {
		let placed = board.placeShip([4, 5], 3, 0); // ship of length 3, horz, at (4,5)
		let correctlyAssigned = true;
		expect(placed).toBe(true);

		for(let i = 6; i < 8; i++)
		{
			correctlyAssigned = correctlyAssigned && (board.mat[4][i][0] == 4 && board.mat[4][i][1] == 5)
		}
		
		expect(correctlyAssigned).toBe(true);
	});
	test('can place ships vertically within bounds', () => {
		let placed = board.placeShip([7, 7], 3, 1);		
		expect(placed).toBe(true);

		let correctlyAssigned = true;
		for(let i = 8; i < 10; i++)
		{
			correctlyAssigned = correctlyAssigned && (board.mat[i][7][0] == 7 && board.mat[i][7][1] == 7);
		}
		expect(correctlyAssigned).toBe(true);
	})
})