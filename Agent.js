function Agent(perc1, perc2, mH) {
	this.health = 0
	this.type = 0;	
	this.health = 60;
	let maxHealth = mH, inc = 1;
	let prob = random(100);
	if (prob < perc1){
			this.type = 0;
		} else {
		let prob2 = random(100);
		if (prob2 < perc2){
			this.type = 1;
		}
		else this.type = 2;
	}

	this.update = function() {
		if (this.type == 1)this.health += inc;
		if (this.type == 2)this.health -= inc;
		if (this.health > maxHealth)this.health = maxHealth;
	}
}