// const gameboard = require('./gameboard');
import Gameboard from "./gameboard.js";

const Player = function(name, isAI){

	return {
		name: name,
		isAI: isAI,
		board: Gameboard(),
		moveHistory: new Set(),
		makeMove: function(opponent, x, y){
			let result = opponent.board.receiveAttack(x, y);	
			if(!result.invalid)
			{
				this.moveHistory.add(x.toString() + y.toString());
			}			
			return result;
		},
		makeMoveAI: function(opponent){
			// Math.random() * (max - min) + min; max excl, min incl
			console.assert(this.isAI, "Player is not AI, how did you even do this?");
			console.assert(opponent.board.nShips != 0, "There's nothing to sink!");
			let foundValidCoord = false;			
			let x = -1, y = -1;
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