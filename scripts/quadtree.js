
/**
 * QuadTree object.
 *
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * —-+—-------
 *  2  |  3
 *     |
 */
function QuadTree(bounds, maxObjects, maxLevels, level) {
	this.maxObjects = maxObjects || 10;
	this.bounds = bounds;
	this.objects = [];
	this.nodes = [];
	this.level = level || 0;
	this.maxLevels = maxLevels || 5;
	
};	

/*
	 * Clears the quadTree and all nodes of objects
	 */
	QuadTree.prototype.clear = function() {
		this.objects = [];
		for (var i = 0; i < this.nodes.length; i++) {
			if(this.nodes[0] != null){
			this.nodes[i].clear();
			}
		}
		this.nodes = [];
	};
	/*
	* Splits the node into four subnodes by dividing 
	* the node into four equal parts and initializing the four subnodes with the new bounds.
	*/
	
	QuadTree.prototype.split = function(){
	var subWidth = Math.round( this.bounds.width / 2 );
	var subHeight = Math.round( this.bounds.height / 2 );
	var x = Math.round( this.bounds.x );
	var y = Math.round( this.bounds.y );
	
	this.nodes[0] = new QuadTree({x: x+subWidth, y: y, width: subWidth, height: subHeight}, this.maxObjects, this.maxLevels, this.level+1);  
	this.nodes[1] = new QuadTree({x: x, y: y, width: subWidth, height: subHeight}, this.maxObjects, this.maxLevels, this.level+1);
	this.nodes[2] = new QuadTree({x: x, y: y+subHeight, width: subWidth, height: subHeight}, this.maxObjects, this.maxLevels, this.level+1);
	this.nodes[3] = new QuadTree({x: x+subWidth, y: y+subHeight, width: subWidth, height: subHeight}, this.maxObjects, this.maxLevels, this.level+1);
	};
	
/*
 * Determine which node the object belongs to. -1 means
 * object cannot completely fit within a child node and is part
 * of the parent node
 */
	QuadTree.prototype.getIndex = function(obj){
	var index = -1;
	var verticalMidpoint = this.bounds.x + (this.bounds.width / 2);
	var horizontalMidpoint = this.bounds.y + (this.bounds.height / 2);
	
	// Object can completely fit within the top quadrants
	var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
	// Object can completely fit within the bottom quadrants
	var bottomQuadrant = (obj.y > horizontalMidpoint);
	
	// Object can completely fit within the left quadrants
	if (obj.x < verticalMidpoint && obj.x + obj.width < verticalMidpoint){
		if(topQuadrant){
			index = 1;
		}
		else if(bottomQuadrant){
			index = 2;
		}
	}
	
	// Object can completely fit within the right quadrants
	else if (obj.x > verticalMidpoint){
		if(topQuadrant){
			index = 0;
		}
		
		else if(bottomQuadrant){
			index = 3;
		}
	}
	
	return index;
	};
	
	/*
 * Insert the object into the quadtree. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding nodes.
 */
	QuadTree.prototype.insert = function(obj){
		var i = 0,index;
		if(this.nodes[0] != null){
		index = this.getIndex(obj);
		
			if(index !== -1){
				this.nodes[index].insert(obj);
				return;
			}
		}
		
		this.objects.push(obj);
		
		if(this.objects.length > this.maxObjects && this.level < this.maxLevels){
			if(this.nodes[0] == null ){
				this.split();
			}
			
			while( i < this.objects.length){
				 index = this.getIndex(this.objects[i]);
				if(index !== -1){
					this.nodes[index].insert(this.objects.splice(i,1)[0]);  // objects.remove(i)
				}
				else{
					i++;
				}
			}
		}
	};	
	
	
// returns all objects it can collide with	
	
	QuadTree.prototype.getObjects = function(obj) { 	
		var index = this.getIndex(obj)
		var returnObjects = this.objects;
			
		//if we have subnodes ...
		if(this.nodes[0] != null) {
			//if obj fits into a subnode ..
			if( index !== -1 ) {
				returnObjects = returnObjects.concat( this.nodes[index].getObjects(obj) );	
			//if obj does not fit into a subnode, check it against all subnodes
			} else {
				for( var i=0; i < this.nodes.length; i++ ) {
					returnObjects = returnObjects.concat( this.nodes[i].getObjects(obj) );
				}
			}
		} 
		return returnObjects; 
	};
	
	


