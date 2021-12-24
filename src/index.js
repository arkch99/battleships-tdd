import Gameboard from './gameboard.js';
import Player from './player.js';
import Ship from './ship.js';
import './index.scss';
import './ship.scss';
import './board.scss';

function markSquares(player1, player2, attackObj)
{
	// TODO: make 'opponent' 
	// player 1 attacks player 2
	let hitX = attackObj.coords[0];
	let hitY = attackObj.coords[1];
	let cellIDPrefix = `${player1.isAI ? 'pl' : 'op'}`;
	const hitCell = document.getElementById(`${cellIDPrefix}${hitX}${hitY}`);	
	if(attackObj.hit == false) // miss
	{
		hitCell.classList.add('missed-square');
	}
	else
	{
		let ship = attackObj.ship;
		if(ship.isSunk())
		{
			let hitSquareContent = player2.board.mat[hitX][hitY];
			let sunkShipStartX = null;
			let sunkShipStartY = null;
			let sunkShipEndX = null;
			let sunkShipEndY = null;
			if(Array.isArray(hitSquareContent.start)) // body
			{
				sunkShipStartX = hitSquareContent.start[0];
				sunkShipStartY = hitSquareContent.start[1];
				sunkShipEndX = hitSquareContent.end[0];
				sunkShipEndY = hitSquareContent.end[1];
			}
			else // head
			{
				sunkShipStartX = hitX;
				sunkShipStartY = hitY;
				if(dir == 0) // horz
				{
					sunkShipEndY = sunkShipStartY + ship.length;
					sunkShipEndX = sunkShipStartX;
				}
				else // vert
				{
					sunkShipEndX = sunkShipStartX + ship.length;
					sunkShipEndY = sunkShipStartY;
				}	
			}
			for(let i = sunkShipStartX; i <= sunkShipEndX; i++)
			{
				for(let j = sunkShipStartY; j <= sunkShipEndY; j++)
				{
					document.getElementById(`${cellIDPrefix}${i}${j}`).classList.add('sunk-ship');
				}
			}
			// hitCell.classList.add('sunk-ship');
			document.getElementById('player-ships').textContent = player2.isAI ? player1.board.nShips : player2.board.nShips;
			document.getElementById('opp-ships').textContent = player2.isAI ? player2.board.nShips : player1.board.nShips;
		}
		else
		{
			hitCell.classList.add('hit-square');
		}
	}
}

function oppClickListener(e, player1, player2)
{
	const cellID = e.target.id;
	let cellCoords = cellID.substr(2);
	let cellX = parseInt(cellCoords.charAt(0));
	let cellY = parseInt(cellCoords.charAt(1));
	// let attackObj = {invalid:true};
	
	let attackObj = player1.makeMove(player2, cellX, cellY);
	
	if(!attackObj.invalid)
	{
		markSquares(player1, player2, attackObj);
		let oppAttackObj = player2.makeMoveAI(player1); //player 2's move
		document.getElementById('turn-display').textContent = 'AI is attacking...';
		setTimeout(() => {
			markSquares(player2, player1, oppAttackObj);
			document.getElementById('turn-display').textContent = 'Your turn!';
		}, 2000);
	}
}

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
			cellOpp.addEventListener('click', (e) => oppClickListener(e, player1, player2));
			player2BoardContainer.appendChild(cellOpp);
		}
	}

	player1.board.shipInfos.forEach(ship => {
		let startX = ship.coords[0];
		let startY = ship.coords[1];
		let selectedShip = player1.board.mat[startX][startY];
		let endX = ship.dir == 0 ? startX : startX + selectedShip.length - 1;
		let endY = ship.dir == 0 ? startY + selectedShip.length - 1 : startY;
		document.getElementById(`pl${startX}${startY}`).classList.add(ship.dir == 0 ? 'ship-start-horz' : 'ship-start-vert', 'intact-ship');
		document.getElementById(`pl${endX}${endY}`).classList.add(ship.dir == 0 ? 'ship-end-horz': 'ship-end-vert', 'intact-ship');
		if(ship.dir == 0)
		{
			for(let i = startY + 1; i < endY; i++)
			{
				document.getElementById(`pl${startX}${i}`).classList.add('ship-horz', 'intact-ship');
			}
		}
		else
		{
			for(let i = startX + 1; i < endX; i++)
			{
				document.getElementById(`pl${i}${startY}`).classList.add('ship-vert', 'intact-ship');
			}
		}
	});
	
	player2BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	player2BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';

	player2.board.shipInfos.forEach(ship => {
		let startX = ship.coords[0];
		let startY = ship.coords[1];
		let selectedShip = player2.board.mat[startX][startY];
		let endX = ship.dir == 0 ? startX : startX + selectedShip.length - 1;
		let endY = ship.dir == 0 ? startY + selectedShip.length - 1 : startY;
		document.getElementById(`op${startX}${startY}`).classList.add(ship.dir == 0 ? 'ship-start-horz' : 'ship-start-vert', 'intact-ship');
		document.getElementById(`op${endX}${endY}`).classList.add(ship.dir == 0 ? 'ship-end-horz': 'ship-end-vert', 'intact-ship');
		if(ship.dir == 0)
		{
			for(let i = startY + 1; i < endY; i++)
			{
				document.getElementById(`op${startX}${i}`).classList.add('ship-horz', 'intact-ship');
			}
		}
		else
		{
			for(let i = startX + 1; i < endX; i++)
			{
				document.getElementById(`op${i}${startY}`).classList.add('ship-vert', 'intact-ship');
			}
		}
	});
}


function init(name)
{
	const playerHuman = Player(name, false);
	const playerAI = Player('AI', true);
	
	document.getElementById('turn-display').textContent = 'Your turn!';
	
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