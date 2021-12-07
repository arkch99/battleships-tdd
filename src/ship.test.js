import Ship from './ship';

describe('Ship', () => {
	beforeAll(() => {
		testShip = Ship(4);
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
		expect(testShip.hit(3)).toBe(true);
		expect(testShip.locations[3]).toBe(true);
	});
	test('cannot be hit twice on same square', () => {
		expect(testShip.hit(3)).toBe(false);
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
