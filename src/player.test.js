import Player from './player';

describe('Player', () => {
	beforeAll(() => {
		playerA = Player('Me', false);
		playerB = Player('AI', true);
	});
	test('player is created with name given', () => {
		expect(playerA.name).toBe('Me');
		expect(playerB.name).toBe('AI');
	});
	test('separate boards are given to each player', () => {
		expect(playerA.board).toMatchObject({
			mat: expect.any(Array),
		});
		expect(playerB.board).toMatchObject({
			mat: expect.any(Array),
		});
		expect(playerA.board !== playerB.board).toBe(true);
	});
	
	test("player gets feedback on moves", () => {
		let result = playerA.makeMove(playerB, 3, 4);
		expect(result).toMatchObject({
			invalid: false,
			hit: false,
			ship: null
		});
	});
});