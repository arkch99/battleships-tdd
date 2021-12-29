import Gameboard from "./gameboard.js";

const Player = function(name, isAI){

	return {
		name: name,
		isAI: isAI,
		board: Gameboard(),
		moveHistory: new Set(),
		hitSquares: new Map(),
		makeMove: function(opponent, x, y){
			let result = opponent.board.receiveAttack(x, y);	
			if(!result.invalid)
			{
				this.moveHistory.add(x.toString() + y.toString());
				if(result.hit && result.ship.isSunk() && this.isAI)
				{
					for(const [coord, dir] of this.hitSquares)
					{
						let prevX = parseInt(coord[0]);
						let prevY = parseInt(coord[1]);
						if(opponent.board.getShipFromCoords([prevX, prevY]) === result.ship)
						{
							this.hitSquares.delete(coord);
						}
					}
				}
				else if(result.hit && this.isAI)
				{
					let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
					let hitDir = null;
					let foundPredecessor = false;
					dirs.forEach(dir => {
						// 'new' is quite the misnomer because these are actually previously hit squares
						let newX = x + dir[0];
						let newY = y + dir[1];						
						if(newX >= 0 && newX < 10 && newY >= 0 && newY < 10) // boundary check
						{
							if(this.moveHistory.has(`${newX}${newY}`)) // unless these coords have been hit, cannot help in finding direction of ship
							{
								let prevShip = opponent.board.getShipFromCoords([newX, newY]);
								if(prevShip !== null) // not miss
								{									
									let currShip = opponent.board.getShipFromCoords([x, y]);
									if(prevShip === currShip) // hitting the same ship, gives direction. Also gives the ai superpowers									
									{
										hitDir = (newX == x) ? 0 : 1;
										this.hitSquares.set(`${x}${y}`, hitDir);
										this.hitSquares.set(`${newX}${newY}`, hitDir);
										foundPredecessor = true;
										// break;
									}									
								}
							}
						}
					});
					if(!foundPredecessor)
					{
						this.hitSquares.set(`${x}${y}`, null);
					}
				}
			}			
			return result;
		},
		makeMoveAI: function(opponent){
			// Math.random() * (max - min) + min; max excl, min incl
			console.assert(this.isAI, "Player is not AI, how did you even do this?");
			console.assert(opponent.board.nShips != 0, "There's nothing to sink!");
			let foundValidCoord = false;			
			let x = -1, y = -1;
			let allSqsBlind = true;
			if(this.hitSquares.size != 0)
			{
				console.log(this.hitSquares)
				this.hitSquares.forEach((dir, coord) => {
					let prevX = parseInt(coord[0]);
					let prevY = parseInt(coord[1]);
					allSqsBlind &&= (dir === null);
					if(dir !== null && !opponent.board.getShipFromCoords([prevX, prevY]).isSunk())
					{
						let dirs = [];
						if(dir == 0) // horz
						{
							dirs = [[prevX, prevY + 1], [prevX, prevY - 1]];						
						}
						else
						{
							dirs = [[prevX + 1, prevY], [prevX - 1, prevY]];
						}
						dirs.forEach(prospectiveDir => {
							let newX = prospectiveDir[0];
							let newY = prospectiveDir[1];
							if(newX >= 0 && newX < 10 && newY >= 0 && newY < 10)
							{
								if(!this.moveHistory.has(`${newX}${newY}`))
								{
									x = newX;
									y = newY;
									foundValidCoord = true;
									// break;
								}
							}
						});
					}					
				});
			}
			if(allSqsBlind && this.hitSquares.size != 0)
			{
				for(const[coord, dir] of this.hitSquares)
				{
					while(!foundValidCoord)
					{
						let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
						let shuffledDirs = dirs
							.map((value) => ({ value, sort: Math.random() }))
							.sort((a, b) => a.sort - b.sort)
							.map(({ value }) => value);
						for(let dir of shuffledDirs)
						{
							let prospectiveX = parseInt(coord[0]) + dir[0];
							let prospectiveY = parseInt(coord[1]) + dir[1];
							if(prospectiveX < 0 || prospectiveX >= 10 || prospectiveY < 0 || prospectiveY >= 10)
							{
								continue;
							}

							if(!this.moveHistory.has(`${prospectiveX}${prospectiveY}`))
							{
								x = prospectiveX;
								y = prospectiveY;
								foundValidCoord = true;
								break;
							}
						}
					}
					if(foundValidCoord)	
					{
						break;
					}
				}
				
			}
			while(!foundValidCoord)
			{
				x = Math.floor(Math.random() * (10 - 0) + 0);
				y = Math.floor(Math.random() * (10 - 0) + 0);
				if(!this.moveHistory.has(x.toString() + y.toString()))
				{
					foundValidCoord = true;
					break;
				}
			}
			return this.makeMove(opponent, x, y);
		}
	};
}

export default Player;