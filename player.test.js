const player = require('./player');

describe('Player', () => {
	beforeAll(() => {
		playerA = player.Player('Me', false);
		playerB = player.Player('AI', false);
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
});