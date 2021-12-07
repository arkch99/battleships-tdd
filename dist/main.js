/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n// const ship = require('./ship');\n\n\nconst Gameboard = function() {\n\treturn {\n\t\tmat: [...Array(10)].map(row => Array(10).fill(null)),\n\t\tnShips: 0,\n\t\tplaceShip: function(coords, length, dir) {\n\t\t\t// dir = 0 => horz; dir = 1 => vert\n\t\t\tlet x = coords[0];\n\t\t\tlet y = coords[1];\n\t\t\t\n\t\t\tif(this.mat[x][y]) // must be null - else another ship starts here.\n\t\t\t{\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tif(dir == 1) // vert\n\t\t\t{\n\t\t\t\tif(x + length > 10) // within bounds\n\t\t\t\t{\n\t\t\t\t\treturn false;\n\t\t\t\t}\t\t\t\t\n\t\t\t}\n\t\t\telse // horz\n\t\t\t{\n\t\t\t\tif(y + length > 10)\n\t\t\t\t{\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\t\t\t\t\t\t\n\t\t\tif(dir == 1) // vert\n\t\t\t{\n\t\t\t\tfor(let i = x + 1; i < x + length; i++)\n\t\t\t\t{\n\t\t\t\t\tif(this.mat[i][y]) // occupied\n\t\t\t\t\t{\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfor(let i = x + 1; i < x + length; i++)\n\t\t\t\t{\n\t\t\t\t\tthis.mat[i][y] = [x, y]; // coords of parent ship\n\t\t\t\t}\n\t\t\t}\n\t\t\telse // horz\n\t\t\t{\n\t\t\t\tfor(let i = y + 1; i < y + length; i++)\n\t\t\t\t{\n\t\t\t\t\tif(this.mat[x][i]) // occupied\n\t\t\t\t\t{\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\t\t\n\t\t\t\tfor(let i = y + 1; i < y + length; i++)\n\t\t\t\t{\n\t\t\t\t\tthis.mat[x][i] = [x, y]; // coords of parent ship\n\t\t\t\t}\n\t\t\t}\n\t\t\tthis.mat[x][y] = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n\t\t\tthis.nShips++;\n\t\t\treturn true;\n\t\t},\n\t\treceiveAttack: function(x, y) {\n\t\t\tlet attackObj = {invalid:null, hit:null, ship:null};\n\t\t\tif(this.mat[x][y] === null) // miss\n\t\t\t{\n\t\t\t\tattackObj.invalid = false;\n\t\t\t\tattackObj.hit = false;\t\t\t\t\n\t\t\t\tthis.mat[x][y] = -1;\n\t\t\t}\t\n\t\t\telse if(this.mat[x][y] === -1) // hit already missed square\n\t\t\t{\n\t\t\t\tattackObj.invalid = true;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tif(Array.isArray(this.mat[x][y])) // hit body of ship\n\t\t\t\t{\n\t\t\t\t\tlet ship_x  = this.mat[x][y][0];\n\t\t\t\t\tlet ship_y  = this.mat[x][y][1];\n\t\t\t\t\tlet hitShip = this.mat[ship_x][ship_y];\t\t\t\t\t\n\t\t\t\t\tlet hitPos = Math.max(x - ship_x, y - ship_y); // calculate position of hit on ship\n\t\t\t\t\tsuccessfulHit = hitShip.hit(hitPos);\n\t\t\t\t\tif(successfulHit)\n\t\t\t\t\t{\n\t\t\t\t\t\tattackObj.invalid = false;\n\t\t\t\t\t\tattackObj.hit = true;\n\t\t\t\t\t\tattackObj.ship = hitShip;\n\n\t\t\t\t\t\tif(hitShip.isSunk())\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tthis.nShips--;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse // already hit\n\t\t\t\t\t{\n\t\t\t\t\t\tattackObj.invalid = true;\t\t\t\t\t\t\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse if(typeof(this.mat[x][y]) === 'object')\n\t\t\t\t{\n\t\t\t\t\tlet hitShip = this.mat[x][y];\n\t\t\t\t\tsuccessfulHit = hitShip.hit(0);\n\t\t\t\t\tif(successfulHit)\n\t\t\t\t\t{\n\t\t\t\t\t\tattackObj.invalid = false;\n\t\t\t\t\t\tattackObj.hit = true;\n\t\t\t\t\t\tattackObj.ship = hitShip;\n\n\t\t\t\t\t\tif(hitShip.isSunk())\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tthis.nShips--;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse // already hit\n\t\t\t\t\t{\n\t\t\t\t\t\tattackObj.invalid = true;\t\t\t\t\t\t\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn attackObj;\n\t\t},\n\t\tsetupBoard: function() {\n\t\t\tlet nShips = 5;\n\t\t\tconst lengths = [5, 4, 3, 3, 2];\n\t\t\tlet placedShips = 0;\n\t\t\twhile(placedShips < nShips)\n\t\t\t{\n\t\t\t\tconst currentLength = lengths[placedShips];\n\t\t\t\tlet x = Math.floor(Math.random() * (10 - 0) + 0);\n\t\t\t\tlet y = Math.floor(Math.random() * (10 - 0) + 0);\n\t\t\t\tlet dir = Math.floor(Math.random() * (2 - 0) + 0);\n\t\t\t\tif(this.mat[x][y] === null)\n\t\t\t\t{\n\t\t\t\t\tif(!this.placeShip([x, y], currentLength, dir))\n\t\t\t\t\t{\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t}\n\t\t\t\t\tplacedShips++;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n}\n\n// module.exports = {Gameboard};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n//# sourceURL=webpack://battleships-tdd/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\n\n\n// function drawBoard(container)\n// {\n\n// }\n\nfunction drawBoards(player1, player2)\n{\n\tconst player1BoardContainer = document.getElementById('own-board');\n\tconst player2BoardContainer = document.getElementById('opp-board');\n\n\tplayer1BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';\n\tplayer1BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';\n\t\n\tplayer2BoardContainer.style.gridTemplateRows = 'repeat(10, auto)';\n\tplayer2BoardContainer.style.gridTemplateColumns = 'repeat(10, auto)';\n}\n\n\nfunction init(name)\n{\n\tconst playerHuman = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(name, false);\n\tconst playerAI = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('AI', true);\n\n\tdocument.getElementById('info-get-screen').style.display = 'none';\n\tdocument.getElementById('game-screen').style.display = 'block';\n\n\tplayerHuman.board.setupBoard();\n\tplayerAI.board.setupBoard();\n\n\tdrawBoards(playerHuman, playerAI);\n}\n\nfunction getName()\n{\n\tconst name = document.getElementById('player-name').textContent;\t\n\tinit(name);\n}\n\ndocument.getElementById('player-name-submit').onclick = getName;\n\n//# sourceURL=webpack://battleships-tdd/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n// const gameboard = require('./gameboard');\n\n\nconst Player = function(name, isAI){\n\n\treturn {\n\t\tname: name,\n\t\tisAI: isAI,\n\t\tboard: (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(),\n\t\tmoveHistory: new Set(),\n\t\tmakeMove: function(opponent, x, y){\n\t\t\tlet result = opponent.board.receiveAttack(x, y);\t\n\t\t\tif(!result.invalid)\n\t\t\t{\n\t\t\t\tthis.moveHistory.add(x.toString() + y.toString());\n\t\t\t}\t\t\t\n\t\t\treturn result;\n\t\t},\n\t\tmakeMoveAI: function(opponent){\n\t\t\t// Math.random() * (max - min) + min; max excl, min incl\n\t\t\tconsole.assert(this.isAI, \"Player is not AI, how did you even do this?\");\n\t\t\tconsole.assert(opponent.board.nShips != 0, \"There's nothing to sink!\");\n\t\t\tlet foundValidCoord = false;\t\t\t\n\t\t\tlet x = -1, y = -1;\n\t\t\twhile(!foundValidCoord)\n\t\t\t{\n\t\t\t\tx = Math.floor(Math.random() * (10 - 0) + 0);\n\t\t\t\ty = Math.floor(Math.random() * (10 - 0) + 0);\n\t\t\t\tif(!this.moveHistory.has(x.toString() + y.toString()))\n\t\t\t\t{\n\t\t\t\t\tfoundValidCoord = true;\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn this.makeMove(opponent, x, y);\n\t\t}\n\t};\n}\n\n// module.exports = {Player};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleships-tdd/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = function(length) {\n\treturn {\n\t\tlength: length,\t\t\n\t\tlocations: Array(length).fill(false),\n\t\tisSunk: function(){\n\t\t\treturn this.locations.reduce((prev, curr) => prev && curr)\n\t\t},\n\t\thit: function(pos){\n\t\t\tif(!this.locations[pos])\n\t\t\t{\n\t\t\t\tthis.locations[pos] = true;\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\treturn false;\n\t\t}\n\t}\n}\n\n// module.exports = {Ship};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleships-tdd/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;