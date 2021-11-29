const gameboard = require('./gameboard');

describe('Gameboard', () => {	
	describe('basic', () => {
		beforeAll(() => {
			board = gameboard.Gameboard();
		});
		test('is created', () => {
			expect(board).not.toBeUndefined();
		});
		test('has proper dimensions', () => {
			expect(board.mat.length).toBe(10) && expect(board.mat[0].length).toBe(10);
		});
		test('starts empty', () => {
			expect(board.nShips).toStrictEqual(0);
		});
		test('can place ships horizontally within bounds', () => {
			let nPrevShips = board.nShips;
			let placed = board.placeShip([4, 5], 3, 0); // ship of length 3, horz, at (4,5)
			let correctlyAssigned = true;			
			expect(placed).toBe(true);
			expect(board.nShips).toBe(nPrevShips + 1);
			for(let i = 6; i < 8; i++)
			{
				correctlyAssigned = correctlyAssigned && (board.mat[4][i][0] == 4 && board.mat[4][i][1] == 5)
			}
			
			expect(correctlyAssigned).toBe(true);
		});
		test('can place ships vertically within bounds', () => {
			let nPrevShips = board.nShips;
			let placed = board.placeShip([7, 7], 3, 1);		
			expect(placed).toBe(true);
			expect(board.nShips).toBe(nPrevShips + 1);
			let correctlyAssigned = true;
			for(let i = 8; i < 10; i++)
			{
				correctlyAssigned = correctlyAssigned && (board.mat[i][7][0] == 7 && board.mat[i][7][1] == 7);
			}
			expect(correctlyAssigned).toBe(true);
		});
	});
	describe('boundary and overlap check', () => {
		beforeAll(() => {
			board = gameboard.Gameboard();
			board.placeShip([1, 2], 5, 0);
			board.placeShip([4, 5], 3, 0);
			board.placeShip([5, 2], 2, 1);
			board.placeShip([7, 7], 3, 1);
		});
		test('does not allow placing ships horizontally out of bounds', () => {
			let nPrevShips = board.nShips;
			expect(board.placeShip([3, 8], 3, 0)).toBe(false);
			expect(board.nShips).toBe(nPrevShips);
		});
		test('does not allow placing ships vertically out of bounds', () => {
			let nPrevShips = board.nShips;
			expect(board.placeShip([6, 3], 5, 1)).toBe(false);
			expect(board.nShips).toBe(nPrevShips);
		});
		test('does not allow orthogonal overlap - source vertical', () => {
			let nPrevShips = board.nShips;
			expect(board.placeShip([0, 3], 3, 1)).toBe(false);
			expect(board.nShips).toBe(nPrevShips);
		});
		test('does not allow orthogonal overlap - source horizontal', () => {
			let nPrevShips = board.nShips;
			expect(board.placeShip([6, 1], 5, 0)).toBe(false);
			expect(board.nShips).toBe(nPrevShips);
		});
		test('does not allow linear overlap - horizontal', () => {
			let nPrevShips = board.nShips;
			expect(board.placeShip([4, 4], 3, 0)).toBe(false);
			expect(board.nShips).toBe(nPrevShips);
		});
		test('does not allow linear overlap - vertical', () => {
			let nPrevShips = board.nShips;
			expect(board.placeShip([7, 7], 2, 1)).toBe(false);
			expect(board.nShips).toBe(nPrevShips);
		});
	});
	describe('attacking', () => {
		beforeAll(() => {
			board = gameboard.Gameboard();
			board.placeShip([1, 2], 5, 0);
			board.placeShip([4, 5], 3, 0);
			board.placeShip([5, 2], 2, 1);
			board.placeShip([7, 7], 3, 1);				
		});
		test('(meta) placed 4 ships', () => {
			expect(board.nShips).toBe(4);
		});		
		test('registers missed attack', () => {
			let nPrevShips = board.nShips;
			expect(board.receiveAttack(0, 4)).toMatchObject({
				invalid: false,
				hit: false,
				ship: null
			});
			expect(board.receiveAttack(6, 4)).toMatchObject({
				invalid: false,
				hit: false,
				ship: null
			});
			expect(board.nShips).toBe(nPrevShips);
		});
		test('registers hits on body', () => {
			expect(board.receiveAttack(1, 4)).toStrictEqual({
				invalid: false,
				hit: true,
				ship: {
					length: 5,
					locations:[false, false, true, false, false],
					isSunk: expect.any(Function),
					hit: expect.any(Function)
				}
			});
		});
		test('registers hits on head', () => {
			expect(board.receiveAttack(7, 7)).toStrictEqual({
				invalid: false,
				hit: true,
				ship: {
					length: 3,
					locations:[true, false, false],
					isSunk: expect.any(Function),
					hit: expect.any(Function)
				}
			});
		});
		test('registers mutiple hits', () => {
			let nPrevShips = board.nShips;
			board.receiveAttack(4, 6);
			expect(board.receiveAttack(4, 5)).toStrictEqual({
				invalid: false,
				hit: true,
				ship: {
					length: 3,
					locations: [true, true, false],
					isSunk: expect.any(Function),
					hit: expect.any(Function)
				}
			});
			expect(board.nShips).toStrictEqual(nPrevShips);
		});
		test('decrements ship count on sinking', () => {
			let nPrevShips = board.nShips;
			let boardResponse = board.receiveAttack(4, 7);
			expect(boardResponse.hit).toBe(true);
			expect(boardResponse.ship.isSunk()).toBe(true);
			expect(board.nShips).toStrictEqual(nPrevShips - 1);
		})
		test('does not allow attack on hit square', () => {
			expect(board.receiveAttack(4, 6)).toStrictEqual({
				invalid: true,
				hit: null,
				ship: null
			});
		});
		test('does not allow attack on missed square', () => {
			expect(board.receiveAttack(0, 4)).toStrictEqual({
				invalid: true,
				hit: null,
				ship: null
			});
		});
	});
});