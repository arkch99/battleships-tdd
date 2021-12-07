import Gameboard from './gameboard.js';
import Player from './player.js';
import Ship from './ship.js';

// function drawBoard(container)
// {

// }

function drawBoards(player1, player2)
{
	const player1BoardContainer = document.getElementById('own-board');
	const player2BoardContainer = document.getElementById('opp-board');

	player1BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	player1BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';
	
	player2BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	player2BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';
}


function init(name)
{
	const playerHuman = Player(name, false);
	const playerAI = Player('AI', true);

	document.getElementById('info-get-screen').style.display = 'none';
	document.getElementById('game-screen').style.display = 'block';

	playerHuman.board.setupBoard();
	playerAI.board.setupBoard();

	drawBoards(playerHuman, playerAI);
}

function getName()
{
	const name = document.getElementById('player-name').textContent;	
	init(name);
}

document.getElementById('player-name-submit').onclick = getName;