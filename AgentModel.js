/**
 -For prey:
 -Tries to move in a random direction.
 -Health increases.
 -When health reaches a threshold:
 -They will reproduce, creating a new "Prey"
 -Their health resets to 1
 
 -For predator:
 -Tries to move in a random direction.
 -Health decreases.
 -When health reaches 0, they die and turn into "Nothing".
 -If the adjacent square is a prey:
 -They will eat it, turning it into a "predator" (reproducing)
 -Their health will increase by the amount of health the eaten prey had
 */

/** class AgentModel
* @param {int} pixSize - sets the size of the agent
* @param {int} t - sets the threshold of the prey
* @param {int} percN - percentage of the "Nothing" Agents
* @param {int} percPrey - percentage of the "Prey" Agents
* @param {int} MaxH - sets the maximum health of the agents
*/
function AgentModel(pixSize, t, percN, percPrey, MaxH) {
	/**
	* colors of the agents
	* white = nothing
	* cyan = prey
	* magenta = predator
	*/
	this.colors = [color(255), color(0, 255, 255), color(255, 0, 255)];
	this.threshold = t;
	this.ps = pixSize;
	this.grid = []; 
	let direction =[createVector(0, 1), createVector(1, 0), createVector(0, -1), createVector(-1, 0)];
	// console.log(direction[floor(random(3))].x);
	let rows = floor(height / pixSize),
		cols = floor(width / pixSize),
		//for the infogrphic we need to keep track of the amount of different agents
		preyCount, predatorCount, prey = [], predator = [];

	//2D array filled with Agents
	for (let x = 0; x < cols; x++) {
		let temp = [];
		for (let y = 0; y < rows; y++) {
			temp[y] = new Agent(percN, percPrey, MaxH);
		}
		this.grid[x] = temp;
	}
	/**
	* this function updates the model 
	*/
	this.update = function() {
		//every time this function is called we reset the predator/prey counters
		preyCount = predatorCount = 0;
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				//update every single Agent
				//the health increases or decreases according to the type
				this.grid[x][y].update();
				//kill all the predator with health lower than 1
				if (this.grid[x][y].health < 1)this.grid[x][y].type = 0;
				//move the Agents that are not "Nothing"
				if(this.grid[x][y].type > 0)this.move(x, y);
				//collect data for the infographic
				if(this.grid[x][y].type == 1) preyCount++;
				if(this.grid[x][y].type == 2) predatorCount++;
			}
		}
		//push the data into arrays
		prey.push(preyCount);
		predator.push(predatorCount);
		//if array bigger than 50 unit erase the first entry
		if(prey.length > 50){
			prey.splice(0, 1);
			predator.splice(0, 1);
		}
	}
	/**function move
	* genarates a random number between 0 and 3 and this defines
	* in which direction the agent moves
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	// this.move = function(x, y) {
	// 	let dir = direction[floor(random(4))],
	// 		xD = dir.x, yD = dir.y;
	// 	// console.log(x, dir.x, y, dir.y);
	// 	if (y == 0 && yD < 0){//here we check the upper edge
	// 		this.move(x, y);//recursion
	// 		return;
	// 	}
	// 	if (x == 0 && xD < 0){//here we check the left edge
	// 		this.move(x, y);//recursion
	// 		return;
	// 	}
	// 	if (y >= rows - 1 && yD > 0){//here we check the bottom edge
	// 		this.move(x, y);//recursion
	// 		return;
	// 	}
	// 	if (x >= cols - 1 && xD > 0){//here we check the right edge
	// 		this.move(x, y);//recursion
	// 		return;
	// 	}
	// 	//if the upper cell is "Nothing" the agent can move up
	// 	// console.log(x, xD, y, yD);
	// 	if (this.grid[x + xD][y + yD].type == 0) {
	// 		let temp = this.grid[x][y + yD].type;//we store the Agent in a temporary variable
	// 		this.grid[x + xD][y + yD].type = this.grid[x][y].type;//and here we swap
	//         //reproduction: if the agent is a prey and its healty than reproduce
	// 		if (this.grid[x][y].type == 1 && this.grid[x][y].health > threshold) {
	// 			this.grid[x][y].type = 1;
	// 			this.grid[x][y].health = 1;
	// 			this.grid[x + xD][y + yD].health = 1;
	// 		} else this.grid[x][y].type = temp;
	// 		return;
	//   	}
	// 	if (this.grid[x + xD][y + yD].type == 2 && this.grid[x][y].type == 1) {
	// 		let h = this.grid[x][y].health;
	// 		this.grid[x][y].type = 2;
	// 		this.grid[x + xD][y + yD].type = 2;
	// 		this.grid[x + xD][y + yD].health += h;
	// 	}
	// 	// let dir = floor(random(4));
	// 	// if(dir == 0)this.moveUp(x, y);
	// 	// if(dir == 1)this.moveRight(x, y);
	// 	// if(dir == 2)this.moveDown(x, y);
	// 	// if(dir == 3)this.moveLeft(x, y);
	// }
	/**
	* this function draws an infographic dispaying every moment the number of 
	* different agents drawn to the screen
	*/
	this.infographic = function(){		
		let top = 450, infoH = -200, left = 10, gutter = 7;
		//first we draw a transparent background
		strokeWeight(3);
		stroke(0);
		fill(255, 200);
		rect(left - gutter, top + gutter, 50 * 3 + gutter * 2, infoH - gutter * 2);
		showData(prey, this.colors[1]);
		showData(predator, this.colors[2]);

		/**function showData
		* gets an array and a color as input and returns a small infographic
		* @param {[]} arr - an Array of values
		* @param {color} col - color to be drawn in the infographic
		*/
		function showData(arr, col){
			noFill();
			stroke(col);
			strokeWeight(6);
			//we draw the data as a continuous line
			//with begin/endShape()
			beginShape();
			for(let i = 0; i < arr.length; i++){
				let val = map(arr[i], 0, cols * rows, 0, infoH);
				vertex(left + i * 3, top + val);
			}
			endShape();
		}
	}
	/**function move
	* genarates a random number between 0 and 3 and this defines
	* in which direction the agent moves
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	this.move = function(x, y) {
		let dir = floor(random(4));
		if(dir == 0)this.moveUp(x, y);
		if(dir == 1)this.moveRight(x, y);
		if(dir == 2)this.moveDown(x, y);
		if(dir == 3)this.moveLeft(x, y);
	}
	/**function moveUp
	* moves the Agent up
	* if the agent is already on the upper edge 
	* calls the move function and exits the function
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	this.moveUp = function(x, y) {
		if (y == 0){//here we check the upper edge
			this.move(x, y);//recursion
			return;
		}
		//if the upper cell is "Nothing" the agent can move up
		if (this.grid[x][y - 1].type == 0) {
			let temp = this.grid[x][y - 1].type;//we store the Agent in a temporary variable
			this.grid[x][y - 1].type = this.grid[x][y].type;//and here we swap
	        //reproduction: if the agent is a prey and its healty than reproduce
			if (this.grid[x][y].type == 1 && this.grid[x][y].health > threshold) {
				this.grid[x][y].type = 1;
				this.grid[x][y].health = 1;
				this.grid[x][y - 1].health = 1;
			} else this.grid[x][y].type = temp;
			return;
	  	}
	  	//if neighbour Agent is a predator
	  	//the Predator eats the prey and reproduces himself and gets the health of the prey
		if (this.grid[x][y - 1].type == 2 && this.grid[x][y].type == 1) {
			let h = this.grid[x][y].health;
			this.grid[x][y].type = 2;
			this.grid[x][y - 1].type = 2;
			this.grid[x][y - 1].health += h;
		}
	}
	/**function moveRight
	* moves the Agent right 
	* if the agent is already on the right edge 
	* it calls the move function and exits the function
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	this.moveRight = function(x, y) {
		if (x >= cols - 1){//here we check the right edge
			this.move(x, y);//recursion
			return;
		}
		//if the right cell is "Nothing" the agent can move right
		if (this.grid[x + 1][y].type == 0) {
			let temp = this.grid[x + 1][y].type;//we store the Agent in a temporary variable
			this.grid[x + 1][y].type = this.grid[x][y].type;//and here we swap
	        //reproduction: if the agent is a prey and its healty than reproduce
	      if (this.grid[x][y].type == 1 && this.grid[x][y].health > this.threshold) {
	      	this.grid[x][y].type = 1;
	      	this.grid[x][y].health = 1;
	      	this.grid[x + 1][y].health = 1;
	      } else this.grid[x][y].type = temp;
	      return;
		}
		//if neighbour Agent is a predator
		//the Predator eats the prey and reproduces himself and gets the health of the prey
		if (this.grid[x + 1][y].type == 2 && this.grid[x][y].type == 1) {
			let h = this.grid[x][y].health;
			this.grid[x][y].type = 2;
			this.grid[x + 1][y].type = 2;
			this.grid[x + 1][y].health += h;
		}
	}
	/**function moveDown
	* moves the Agent down 
	* if the agent is already on the bottom edge 
	* it calls the move function and exits the function
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	this.moveDown = function(x, y) {
		if (y >= rows - 1){//here we check the bottom edge
			this.move(x, y);//recursion
			return;
		}
		//if the right cell is "Nothing" the agent can move down
		if (this.grid[x][y + 1].type == 0) {
			let temp = this.grid[x][y + 1].type;//we store the Agent in a temporary variable
			this.grid[x][y + 1].type = this.grid[x][y].type;//and here we swap
	        //reproduction: if the agent is a prey and its healty than reproduce
	      if (this.grid[x][y].type == 1 && this.grid[x][y].health > threshold) {
	      	this.grid[x][y].type = 1;
	      	this.grid[x][y].health = 1;
	      	this.grid[x][y + 1].health = 1;
	      } else this.grid[x][y].type = temp;
	      return;
		}
		//if neighbour Agent is a predator
		//the Predator eats the prey and reproduces himself and gets the health of the prey
		if (this.grid[x][y + 1].type == 2 && this.grid[x][y].type == 1) {
			let h = this.grid[x][y].health;
			this.grid[x][y].type = 2;
			this.grid[x][y + 1].type = 2;
			this.grid[x][y + 1].health += h;
		}
	}
	/**function moveLeft
	* moves the Agent left
	* if the agent is already on the left edge 
	* it calls the move function and exits the function
	* @param {int} x - x position
	* @param {int} y - y position
	*/
	this.moveLeft = function(x, y) {		
		if (x == 0){//here we check the left edge
			this.move(x, y);//recursion
			return;
		}
		//if the right cell is "Nothing" the agent can move left
		if (this.grid[x - 1][y].type == 0) {
			let temp = this.grid[x - 1][y].type;//we store the Agent in a temporary variable
			this.grid[x - 1][y].type = this.grid[x][y].type;//and here we swap
	        //reproduction: if the agent is a prey and its healty than reproduce
	      if (this.grid[x][y].type == 1 && this.grid[x][y].health > threshold) {
	      	this.grid[x][y].type = 1;
	      	this.grid[x][y].health = 1;
	      	this.grid[x - 1][y].health = 1;
	      } else this.grid[x][y].type = temp;//else move to that position
	      return;
		}
		//if neighbour Agent is a predator
		//the Predator eats the prey and reproduces himself and gets the health of the prey
		if (this.grid[x - 1][y].type == 2 && this.grid[x][y].type == 1) {
			let h = this.grid[x][y].health;
			this.grid[x][y].type = 2;
			this.grid[x - 1][y].type = 2;
			this.grid[x - 1][y].health += h;
		}
	}
	/**function addAgent
	* adds Agents into an area of 5 * 5
	* @param {int} x - x position
	* @param {int} y - y position
	* @param {int} value - gets the mouseButton value to check if it is RIGHT or LEFT button
	*/
	this.addAgent = function (x, y, value) {
    let a = 5;//area
    //scale x and y to the grid coordinates
    x = floor(x / this.ps);
    y = floor(y / this.ps);
    //and constrain the values to avoid NaN values
    x = constrain(x, a, cols - a);
    y = constrain(y, a, rows - a);
    for (let yy = -a; yy < a; yy++) {
    	for (let xx = -a; xx < a; xx++) {
    		this.grid[x + xx][y + yy].type = value == LEFT ? 2 : 1;//check if it is RIGTH OR LEFT button
    		this.grid[x + xx][y + yy].health = 100;
	    	}
	    }
	}
	/**function show
	* shows tha agents as square / pixel 
	*/
	this.show = function() {
		noStroke();
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				let nx = x * this.ps;
				let ny = y * this.ps;			
				let c = this.colors[this.grid[x][y].type];
				fill(c);
				// ellipse(x * this.ps, y * this.ps, this.ps, this.ps);
				rect(x * this.ps, y * this.ps, this.ps, this.ps);
			}
		}
	}
}