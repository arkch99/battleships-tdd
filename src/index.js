import Gameboard from './gameboard.js';
import Player from './player.js';
import Ship from './ship.js';
import './style.scss';

function drawBoards(player1, player2)
{
	const player1BoardContainer = document.getElementById('own-board');
	const player2BoardContainer = document.getElementById('opp-board');

	document.getElementById('player-ships').textContent = player1.board.nShips;
	document.getElementById('opp-ships').textContent = player2.board.nShips;
	player1BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	player1BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';

	for(let i = 0; i < 10; i++)
	{
		for(let j = 0; j < 10; j++)
		{
			let cellPlayer = document.createElement('div');
			cellPlayer.classList.add('board-cell');					
			cellPlayer.id = `pl${i}${j}`;
			player1BoardContainer.appendChild(cellPlayer);
			
			let cellOpp = document.createElement('div');
			cellOpp.classList.add('board-cell');
			cellOpp.id = `op${i}${j}`;			
			player2BoardContainer.appendChild(cellOpp);
		}
	}
	
	player2BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	player2BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';
}


function init(name)
{
	const playerHuman = Player(name, false);
	const playerAI = Player('AI', true);

	document.getElementById('info-get-screen').style.display = 'none';
	document.getElementById('game-screen').style.display = 'block';
	document.querySelectorAll('.player-name').forEach(ele => {
		ele.textContent = name;
	});
	document.querySelectorAll('.opp-name').forEach(ele => {
		ele.textContent = 'AI';
	});
	playerHuman.board.setupBoard();
	playerAI.board.setupBoard();

	drawBoards(playerHuman, playerAI);
}

function getName()
{
	const name = document.getElementById('player-name').value;	
	init(name);
}

document.getElementById('player-name-submit').onclick = getName;