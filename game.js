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

module.exports = {Ship};