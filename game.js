const Ship = function(length) {
	return {
		length: length,		
		locations: Array(length).fill(false),
		isSunk: function(){
			return this.locations.reduce((prev, curr) => prev && curr)
		},
		hit: function(pos){
			if(!this.locations[pos])
			{
				this.locations[pos] = true;
				return true;
			}
			return false;
		}
	}
}

const Gameboard = function() {
	return {
		mat: [...Array(10)].map(row => Array(10).fill(null)),
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
					this.mat[i][y] = [x, y]; // coords of parent ship
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
					this.mat[x][i] = [x, y]; // coords of parent ship
				}
			}
			this.mat[x][y] = Ship(length);
			return true;
		},
		receiveAttack: function(x, y) {
			let attackObj = {invalid:null, hit:null, ship:null};
			if(this.mat[x][y] === null) // miss
			{
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
				if(Array.isArray(this.mat[x][y])) // hit body of ship
				{
					let ship_x  = this.mat[x][y][0];
					let ship_y  = this.mat[x][y][1];
					let hitShip = this.mat[ship_x][ship_y];					
					let hitPos = Math.max(x - ship_x, y - ship_y); // calculate position of hit on ship
					successfulHit = hitShip.hit(hitPos);
					if(successfulHit)
					{
						attackObj.invalid = false;
						attackObj.hit = true;
						attackObj.ship = hitShip;
					}
					else // already hit
					{
						attackObj.invalid = true;						
					}
				}
				else if(typeof(this.mat[x][y]) === 'object')
				{
					let hitShip = this.mat[x][y];
					successfulHit = hitShip.hit(0);
					if(successfulHit)
					{
						attackObj.invalid = false;
						attackObj.hit = true;
						attackObj.ship = hitShip;
					}
					else // already hit
					{
						attackObj.invalid = true;						
					}
				}
			}
			return attackObj;
		}
	};
}

module.exports = {Ship, Gameboard};