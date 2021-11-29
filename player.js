const gameboard = require('./gameboard');

const Player = function(name, isAI){
	return {
		name: name,
		isAI: isAI,
		board: gameboard.Gameboard(),
	};
}

module.exports = {Player};