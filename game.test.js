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
	})
});