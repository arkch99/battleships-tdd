import Gameboard from './gameboard.js';
import Player from './player.js';
import Ship from './ship.js';
import './index.scss';
import './ship.scss';
import './board.scss';

let player1turn = true;
let gameOverFlag = false;
let shipLengths = [5, 4, 3, 3, 2];
let selectedShipIndex = 0; // initialise to something sensible
let selectedShipDir = 0; // 0 => horz; 1 => vert
let mode = 0; // 0 => ship placement, 1 => play

function disableBoards()
{
	document.getElementById('opp-board').classList.add('click-disabled');
	document.getElementById('own-board').classList.add('click-disabled');
}

function markSquares(player1, player2, attackObj)
{
	// TODO: make 'opponent' player2 everywhere
	// player 1 attacks player 2
	let hitX = attackObj.coords[0];
	let hitY = attackObj.coords[1];
	let cellIDPrefix = `${player1.isAI ? 'pl' : 'op'}`;
	const hitCell = document.getElementById(`${cellIDPrefix}${hitX}${hitY}`);	
	if(!attackObj.hit) // miss
	{
		hitCell.classList.add('missed-square', 'click-disabled');
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
				if(ship.dir == 0) // horz
				{
					sunkShipEndY = sunkShipStartY + ship.length - 1;
					sunkShipEndX = sunkShipStartX;
				}
				else // vert
				{
					sunkShipEndX = sunkShipStartX + ship.length - 1;
					sunkShipEndY = sunkShipStartY;
				}	
			}			
			for(let i = sunkShipStartX; i <= sunkShipEndX; i++)
			{
				for(let j = sunkShipStartY; j <= sunkShipEndY; j++)
				{
					document.getElementById(`${cellIDPrefix}${i}${j}`).classList.add('sunk-ship', 'click-disabled');
				}
			}
			document.getElementById('player-ships').textContent = player2.isAI ? player1.board.nShips : player2.board.nShips;
			document.getElementById('opp-ships').textContent = player2.isAI ? player2.board.nShips : player1.board.nShips;
			if(player1.board.nShips == 0)
			{
				document.getElementById('turn-display').textContent = `${player2.name} wins!`;
				gameOverFlag = true;
				disableBoards();
			}
			else if(player2.board.nShips == 0)
			{
				document.getElementById('turn-display').textContent = `${player1.name} wins!`;
				gameOverFlag = true;
				disableBoards();
			}
		}
		else
		{
			hitCell.classList.add('hit-square', 'click-disabled');
		}
	}
	if(player1turn)
	{
		document.getElementById('opp-board').classList.add('click-disabled');
		// for mp? document.getElementById('opp-board').classList.remove('click-disabled')		
		player1turn = false;
	}
	else
	{
		document.getElementById('opp-board').classList.remove('click-disabled');
		player1turn = true;
	}
}

function paintShip(shipInfoObj, cellPrefix, player)
{
	let startX = shipInfoObj.coords[0];
	let startY = shipInfoObj.coords[1];
	let selectedShip = player.board.mat[startX][startY];
	let endX = shipInfoObj.dir == 0 ? startX : startX + selectedShip.length - 1;
	let endY = shipInfoObj.dir == 0 ? startY + selectedShip.length - 1 : startY;
	document.getElementById(`${cellPrefix}${startX}${startY}`).classList.add(shipInfoObj.dir == 0 ? 'ship-start-horz' : 'ship-start-vert', 'intact-ship');
	document.getElementById(`${cellPrefix}${endX}${endY}`).classList.add(shipInfoObj.dir == 0 ? 'ship-end-horz': 'ship-end-vert', 'intact-ship');
	if(shipInfoObj.dir == 0)
	{
		for(let i = startY + 1; i < endY; i++)
		{
			document.getElementById(`${cellPrefix}${startX}${i}`).classList.add('ship-horz', 'intact-ship');
		}
	}
	else
	{
		for(let i = startX + 1; i < endX; i++)
		{
			document.getElementById(`${cellPrefix}${i}${startY}`).classList.add('ship-vert', 'intact-ship');
		}
	}
}

function oppClickListener(e, player1, player2)
{
	if(gameOverFlag)
	{
		return;
	}
	const cellID = e.target.id;
	let cellCoords = cellID.substr(2);
	let cellX = parseInt(cellCoords.charAt(0));
	let cellY = parseInt(cellCoords.charAt(1));
	
	let attackObj = player1.makeMove(player2, cellX, cellY);
	
	if(!attackObj.invalid)
	{
		markSquares(player1, player2, attackObj);		
		if(!gameOverFlag)		
		{
			let oppAttackObj = player2.makeMoveAI(player1); //player 2's move
			document.getElementById('turn-display').textContent = 'AI is attacking...';
			setTimeout(() => {
				markSquares(player2, player1, oppAttackObj);
				if(gameOverFlag)
				{
					disableBoards();
					return;
				}
				document.getElementById('turn-display').textContent = 'Your turn!';
			}, 2000);
		}		
	}
}

// draws and adds play functionality to boards
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
		paintShip(ship, 'pl', player1);
	});
	
	player2BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	player2BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';

	// debug
	// player2.board.shipInfos.forEach(ship => {
	// 	paintShip(ship, 'op', player2);
	// });
}

function drawPlacementBoard(player)
{
	const boardContainer = document.getElementById('placement-board');

	boardContainer.style.gridTemplateRows = 'repeat(10, auto)';
	boardContainer.style.gridTemplateColumns = 'repeat(10, auto)';

	for(let i = 0; i < 10; i++)
	{
		for(let j = 0; j < 10; j++)
		{
			let cellPlayer = document.createElement('div');
			cellPlayer.classList.add('board-cell');					
			cellPlayer.id = `pl${i}${j}`;					
			boardContainer.appendChild(cellPlayer);			
		}
	}	
}

function placeShipListener(event, player1, player2)
{
	// assume that this is always called for player1
	let coordStr = event.target.id.substr(2);
	let x = parseInt(coordStr.charAt(0));
	let y = parseInt(coordStr.charAt(1));
	let selectedShipLength = shipLengths[selectedShipIndex];

	let isSuccess = player1.board.placeShip([x, y], selectedShipLength, selectedShipDir);
	if(!isSuccess)
	{
		alert('Invalid position!');
	}
	else
	{
		selectedShipIndex++;
		document.getElementById('turn-display').textContent = `Placing ship of length: ${shipLengths[selectedShipIndex]}`;
		document.getElementById('rem-ships').textContent = ` ${shipLengths.length - selectedShipIndex}`;
		
		player1.board.shipInfos.forEach(ship => {
			paintShip(ship, 'pl', player1);
		});	
		if(selectedShipIndex === shipLengths.length) // placed all ships
		{
			selectedShipIndex = null;
			mode = 1;
			document.getElementById('placement-board').remove();
			document.getElementById('orientation-btn').remove();
			
			document.getElementById('opp-board').style.display = 'grid';
			document.getElementById('own-board').style.display = 'grid';

			document.querySelector('.ship-place-info').remove();
			

			document.getElementById('turn-display').textContent = 'All ships placed. Get ready!';

			setTimeout(() =>{
				document.getElementById('turn-display').textContent = 'Your turn!';
				document.querySelectorAll('.player-info, .opp-info').forEach(ele => ele.style.display = 'block');
				drawBoards(player1, player2);
				document.getElementById('opp-board').classList.remove('click-disabled');
				document.getElementById('own-board').classList.add('click-disabled');
			}, 2000);		
		}
	}
}

function changeOrientationListener(event)
{
	const dirTexts = {0:'Horizontal', 1:'Vertical'};
	selectedShipDir = (selectedShipDir + 1) % 2;
	event.target.textContent = dirTexts[selectedShipDir];
}

function setupBoardManual(player1, player2)
{
	mode = 0; // is this even necessary?
	
	document.getElementById('own-board').style.display = 'none';
	document.getElementById('opp-board').style.display = 'none'
	document.getElementById('orientation-btn').addEventListener('click', e => changeOrientationListener(e));

	drawPlacementBoard(player1);

	document.getElementById('turn-display').textContent = `Placing ship of length: ${shipLengths[selectedShipIndex]}`;
	document.getElementById('rem-ships').textContent = ` ${shipLengths.length - selectedShipIndex}`;
	document.querySelectorAll('.player-info, .opp-info').forEach(ele => ele.style.display = 'none');

	for(let i = 0; i < 10; i++)
	{
		for(let j = 0; j < 10; j++)
		{
			let cell = document.getElementById(`pl${i}${j}`);			
			cell.addEventListener('click', (e) => placeShipListener(e, player1, player2));	
		}
	}

}

function init(name)
{
	const playerHuman = Player(name, false);
	const playerAI = Player('AI', true);
	playerAI.board.setupBoard();	
	
	document.getElementById('info-get-screen').style.display = 'none';
	document.getElementById('game-screen').style.display = 'block';
	document.querySelectorAll('.player-name').forEach(ele => {
		ele.textContent = name;
	});
	document.querySelectorAll('.opp-name').forEach(ele => {
		ele.textContent = 'AI';
	});
	setupBoardManual(playerHuman, playerAI);
}

function getName()
{
	const name = document.getElementById('player-name').value;	
	init(name);
}

document.getElementById('player-name-submit').onclick = getName;