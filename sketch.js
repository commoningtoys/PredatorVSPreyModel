let am = null, w, h, agentSize = 10, play = false, showMenu = false, resizeBox, speed = 1;

function setup() {
	w = h = floor(windowHeight / agentSize) * agentSize - (2 * agentSize);
	let canvas = createCanvas(w, h);
	canvas.parent('myCnv');
	pixelDensity(1);
	noStroke();
	//set the position of the element that suggest to resize the window	
	resizeBox = document.getElementById('resizeMe');
	// initModel();
}

function draw() {
	resizeBox.style.left = 13 + w + 'px';
	if(play){
		if(frameCount % speed == 0){
			am.update();
		}
		am.show();
		am.infographic();
	}
}

function mousePressed(){
	if(play)am.addAgent(mouseX, mouseY, mouseButton);
}

function initModel(){
		let input1 = document.getElementById("threshold").value;
		let input2 = document.getElementById("maxHealth").value;
		let input3 = document.getElementById("empty").value;
		let input4 = document.getElementById("prey").value;
		am = new AgentModel(agentSize, input1, input3, input4, input2);
}
function updateValue(){
	document.getElementById("thehreshold").innerHTML = "THRESHOLD: " + document.getElementById("threshold").value;
	document.getElementById("themaxHealth").innerHTML = "MAX HEALTH: " + document.getElementById("maxHealth").value;
	document.getElementById("theempty").innerHTML = "EMPTY: " + document.getElementById("empty").value + "%";
	document.getElementById("theprey").innerHTML = "PREY: " + document.getElementById("prey").value + " %";
	let docSpeed = parseFloat(document.getElementById("speed").value);
	document.getElementById("thespeed").innerHTML = "SPEED: " + docSpeed + " %";
	speed = floor(map(docSpeed, 1, 100, 10, 1));

}

function showDescription(){
	showMenu = !showMenu;
	document.getElementById("howButton").innerHTML = showMenu == true ? "HIDE DESCRIPTION" : "HOW IT WORKS";
	let myDesc = document.getElementById("description");
	let left = 200, gutter = 20;
	myDesc.style.top = gutter + "px";
	myDesc.style.left = left + "px";
	myDesc.style.width = (w - left - gutter) + "px";
	myDesc.style.height = (w - 2 * gutter) + "px";
	let txt = document.getElementsByClassName("textElement");
	for(let i = 0; i < txt.length; i++){
		txt[i].style.display = showMenu == true ? "block" : "none";
	}
}

function checkWindow(){
	let thisW = window.innerWidth;
	let gutter = 30;
	if(thisW > w - gutter && thisW < w + gutter) {
		play = true;
	}else play = false;
}
















