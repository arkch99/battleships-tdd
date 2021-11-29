const Ship = function(length) {
	return {
		length: length,		
		locations: Array(length).fill(false),
		isSunk: function(){
			return this.locations.reduce((prev, curr) => prev && curr)
		},
		hit: function(pos){
			this.locations[pos] = true;			
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
		}
	};
}

module.exports = {Ship, Gameboard};