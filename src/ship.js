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

export default Ship;