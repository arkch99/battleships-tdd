const Ship = function(length, dir) {
	return {
		length: length,		
		locations: Array(length).fill(false),
		dir: dir, // 0 => horz, 1 => vert
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

export default Ship;