import Ship from "./ship.js";

const Gameboard = function() {	
	return {
		mat: [...Array(10)].map(row => Array(10).fill(null)),
		shipInfos: [],
		nShips: 0,
		placeShip: function(coords, length, dir) {
			// dir = 0 => horz; dir = 1 => vert
			let x = coords[0];
			let y = coords[1];
			
			if(this.mat[x][y]) // must be null - else another ship starts here.
			{
				return false;
			}
			if(dir == 1) // vert
			{
				if(x + length > 10) // within bounds
				{
					return false;
				}				
			}
			else // horz
			{
				if(y + length > 10)
				{
					return false;
				}
			}						
			if(dir == 1) // vert
			{
				for(let i = x + 1; i < x + length; i++)
				{
					if(this.mat[i][y]) // occupied
					{
						return false;
					}
				}
				for(let i = x + 1; i < x + length; i++)
				{
					this.mat[i][y] = {start:[x, y], end:[x + length - 1, y]}; // coords of parent ship
				}
			}
			else // horz
			{
				for(let i = y + 1; i < y + length; i++)
				{
					if(this.mat[x][i]) // occupied
					{
						return false;
					}
				}		
				for(let i = y + 1; i < y + length; i++)
				{
					this.mat[x][i] = {start:[x, y], end:[x, y + length - 1]}; // coords of parent ship
				}
			}
			this.mat[x][y] = Ship(length);
			this.nShips++;
			this.shipInfos.push({
				coords:[x, y],
				dir: dir
			});
			return true;
		},
		receiveAttack: function(x, y) {
			let attackObj = {invalid:null, hit:null, ship:null, coords: null};
			if(this.mat[x][y] === null) // miss
			{
				attackObj.coords = [x, y];
				attackObj.invalid = false;
				attackObj.hit = false;				
				this.mat[x][y] = -1;
			}	
			else if(this.mat[x][y] === -1) // hit already missed square
			{
				attackObj.invalid = true;
			}
			else
			{				
				if(Array.isArray(this.mat[x][y].start)) // hit body of ship
				{
					let ship_x  = this.mat[x][y].start[0];
					let ship_y  = this.mat[x][y].start[1];
					let hitShip = this.mat[ship_x][ship_y];						
					let hitPos = Math.max(x - ship_x, y - ship_y); // calculate position of hit on ship
					
					let successfulHit = hitShip.hit(hitPos);
					if(successfulHit)
					{
						attackObj.invalid = false;
						attackObj.hit = true;
						attackObj.ship = hitShip;
						attackObj.coords = [x, y];

						if(hitShip.isSunk())
						{
							this.nShips--;
						}
					}
					else // already hit
					{
						attackObj.invalid = true;						
					}
				}
				else if(typeof(this.mat[x][y]) === 'object') // hit head
				{
					let hitShip = this.mat[x][y];
					let successfulHit = hitShip.hit(0);
					if(successfulHit)
					{
						attackObj.invalid = false;
						attackObj.hit = true;
						attackObj.ship = hitShip;
						attackObj.coords = [x, y];
						
						if(hitShip.isSunk())
						{
							this.nShips--;
						}
					}
					else // already hit
					{
						attackObj.invalid = true;						
					}
				}
			}
			return attackObj;
		},
		setupBoard: function() {
			let nShips = 5;
			const lengths = [5, 4, 3, 3, 2];
			let placedShips = 0;
			while(placedShips < nShips)
			{
				const currentLength = lengths[placedShips];
				let x = Math.floor(Math.random() * (10 - 0) + 0);
				let y = Math.floor(Math.random() * (10 - 0) + 0);
				let dir = Math.floor(Math.random() * (2 - 0) + 0);
				if(this.mat[x][y] === null)
				{
					if(!this.placeShip([x, y], currentLength, dir))
					{
						continue;
					}
					placedShips++;
				}
				else
				{
					continue;
				}
			}
		}
	};
}

export default Gameboard;