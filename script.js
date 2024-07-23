// JavaScript Document

var PageIndex = 0; // Variable used to check what page the user is currently on, which is default to the about me page, index 0
// Page 0: About page
// Page 1: Emergence page
// Page 2: Simulation page

var PageList = document.querySelectorAll(".page"); // Gets an array of all the pages available

// About Page Variables
var TechniqueIndex = 0; // Variable used to check what technique the user is currently on in the about me page, which is default to the first technique, cellular automata, index 0
var TechniqueList = document.querySelectorAll(".technique"); // Gets an array of all the techniques available
//
// Loading Page and Techniques, making default visible
UpdateTechnique(); // runs the function to make everything's display to none except the technique with the index of TechniqueIndex. Ran it on load to be able to display only the default technique
UpdatePage();// runs the function to make everything's display to none except the page with the index of PageIndex. Ran it on load to be able to display only the default page
//

function openNav() {
  document.getElementById("MainNavContainer").style.width = "150px";
  document.getElementById("main").style.marginLeft = "150px";
}

function closeNav() {
  document.getElementById("MainNavContainer").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function UpdateTechnique(numberadded = 0){
	console.log(TechniqueList.length);
	TechniqueList[TechniqueIndex].style.display = "none";
	TechniqueIndex += numberadded;
	if (TechniqueIndex > TechniqueList.length - 1){
		TechniqueIndex = 0;
	}
	else if (TechniqueIndex < 0){
		TechniqueIndex = TechniqueList.length - 1;
	}
	TechniqueList[TechniqueIndex].style.display = "grid";
}

function UpdatePage(numberchosen = 0){
	console.log(PageList.length);
	PageList[PageIndex].style.display = "none";
	PageIndex = numberchosen;
	PageList[PageIndex].style.display = "inline";
}


// Function to enter fullscreen mode
function enterFullscreen() {
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} else if (document.documentElement.mozRequestFullScreen) { // Firefox
		document.documentElement.mozRequestFullScreen();
	} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
		document.documentElement.webkitRequestFullscreen();
	} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
		document.documentElement.msRequestFullscreen();
	}
}// Function to exit fullscreen mode
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { // Firefox
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { // IE/Edge
		document.msExitFullscreen();
	}
}


var fullscreen = false;

document.getElementById('full-screen-button').addEventListener('click', () => {
	if (fullscreen){
		exitFullscreen();
		fullscreen = false;
	}
	else{
		enterFullscreen();
		fullscreen = true;
	}
});


document.getElementById('technique-left-button').addEventListener('click', function() {
	UpdateTechnique(-1);
});
document.getElementById('technique-right-button').addEventListener('click', function() {
	UpdateTechnique(1);
});




document.getElementById('linkpage1').addEventListener('click', function() {
	UpdatePage(0);
});
document.getElementById('linkpage2').addEventListener('click', function() {
	UpdatePage(1);
});
document.getElementById('linkpage3').addEventListener('click', function() {
	UpdatePage(2);
});

// Nav transition from menu icon, to X icon and vice versa
document.getElementById('nav-expand-button').addEventListener('click', function() {
	if (document.getElementById("MainNavContainer").style.width <= "0px"){
		openNav();
		document.getElementById('nav-expand-button').classList.toggle("change");
	}
	else{
		closeNav();
		document.getElementById('nav-expand-button').classList.toggle("change");
	}
});
//


window.addEventListener('resize', function() {
	if (window.innerWidth > 800){
		document.getElementById('MainNavContainer').style.width = "100%";
		document.getElementById("main").style.marginLeft= "0";
	}
	else{
		document.getElementById('MainNavContainer').style.width = "0%";
		document.getElementById("main").style.marginLeft= "0";
	}
	
	
	if(document.getElementById('nav-expand-button').classList.contains("change")){
		document.getElementById('nav-expand-button').classList.remove("change");
	}
});

// Emergence Quiz
var Questions = ["Is flocking behavior in birds an example of emergence?", 
				 "Is the functioning of a mechanical clock an example of emergence?",
				 "Is an ant colony's behavior an example of emergence?",
				 "Is following a recipe to cook a dish an example of emergence?",
				 "Is market economy behavior an example of emergence?"
				];
var Answers = [
	["No, because the birds are following a leader.",
	 "Yes, because the coordinated group movement arises from simple local rules followed by each bird.",
	 "No, because the movement is pre-programmed in the birds' genetics.",
	 "Yes, because each bird independently knows the overall pattern to follow.",
	 1], 
	["Yes, because the parts work together to produce the time.",
	 "Yes, because the clock can keep time independently.",
	 "No, because each part's function is explicitly designed and predictable.",
	 "No, because the clock uses complex algorithms.",
	 2], 
	["No, because ants individually decide what to do based on personal needs.",
	 "No, because the queen ant controls the entire colony.",
	 "Yes, because each ant knows the overall plan of the colony.",
	 "Yes, because the colony's complex behaviors arise from simple interactions among ants.",
	 3], 
	["No, because the outcome is a direct result of combining ingredients in a specific way.",
	 "Yes, because the final dish has new properties not found in the individual ingredients.",
	 "Yes, because the ingredients interact to create something new.",
	 "No, because cooking is a complex process.",
	 0], 
	["No, because it is controlled by government regulations.",
	 "Yes, because the complex dynamics arise from individual decisions of buyers and sellers.",
	 "No, because prices are set by individual companies.",
	 "Yes, because the market follows predetermined economic models.",
	 1]];
var QuestionSlot = document.querySelector("#emergence-question-slot");
var AnswerSlots = document.querySelectorAll(".emergence-answer");
var ScoreSlot = document.querySelector("#emergence-score");
var ScorePercentageSlot = document.querySelector("#emergence-score-percentage");
var AmtOfQuestionSlot = document.querySelector("#emergence-question-count");
var SubmitButton = document.querySelector("#emergence-submit");
var RandomBag = [];
var CurrentRandomBagIndex = 0;
var ChosenAnswer = false;
var ChosenAnswerIndex = 0;
var Score = 0;
var QuestionsDone = 0;

for (var i = 0; i < Questions.length; i++){
	RandomBag.push(i);
}
ShuffleArrray(RandomBag);
var CurrentQuestionIndex = RandomBag[CurrentRandomBagIndex];
UpdateQuiz();

function ShuffleArrray(RandomArray){
	for (var i = 0; i < Questions.length; i++){
		var RandomNumber1 = Math.floor(Math.random() * Questions.length);
		var RandomNumber2 = Math.floor(Math.random() * Questions.length);
		var Copy = RandomArray[RandomNumber1];
		
		RandomArray[RandomNumber1] = RandomArray[RandomNumber2];
		RandomArray[RandomNumber2] = Copy;
	}
}
function UpdateQuiz(){
	CurrentQuestionIndex = RandomBag[CurrentRandomBagIndex];
	
	QuestionSlot.innerHTML = Questions[CurrentQuestionIndex];
	for (let i = 0; i < AnswerSlots.length; i++){
		console.log(i);
		console.log(Answers[CurrentQuestionIndex][i]);
		AnswerSlots[i].innerHTML = Answers[CurrentQuestionIndex][i];
	}
	UpdateQuizAnswerSelection();
	ScoreSlot.innerHTML = "Score: " + Score;
	AmtOfQuestionSlot.innerHTML = "Questions Done: " + QuestionsDone;
	if (QuestionsDone > 0 && Score > 0){
		ScorePercentageSlot.innerHTML = "Score Percentage: " + Math.floor(Score / QuestionsDone * 100) + "%";
	}
	else{
		ScorePercentageSlot.innerHTML = "Score Percentage: 0%";
	}
}
function UpdateQuizAnswerSelection(){
	for(let i = 0; i < AnswerSlots.length; i++){
		AnswerSlots[i].style.backgroundColor = "#463738";
	}
	if (ChosenAnswer){
		AnswerSlots[ChosenAnswerIndex].style.backgroundColor = "green";
	}
}
function addClickListener(slot, index) {
    slot.addEventListener('click', function() {
        ChosenAnswer = true;
        ChosenAnswerIndex = index;
        UpdateQuizAnswerSelection();
    });
}


for (let i = 0; i < AnswerSlots.length; i++) {
    addClickListener(AnswerSlots[i], i);
}

SubmitButton.addEventListener('click', function() {
	CurrentQuestionIndex = RandomBag[CurrentRandomBagIndex];
	if(ChosenAnswer){
		CurrentRandomBagIndex++;
		QuestionsDone++;
		ChosenAnswer = false;
		if (CurrentRandomBagIndex > Questions.length - 1){
			CurrentRandomBagIndex = 0; // change later to showing completed quiz or something
			ShuffleArrray(RandomBag);
		}
		if (ChosenAnswerIndex == Answers[CurrentQuestionIndex][4]){
			Score++;
		}
		UpdateQuiz();
	}
});




// ParticleLifeSimulation
const canvas = document.getElementById("ParticleLifeSimulation");
const ctx = canvas.getContext("2d");

var devicePixelRatio = window.devicePixelRatio || 1;

console.log(canvas.style.width);

canvas.width = 550 * devicePixelRatio;
canvas.height = 550 * devicePixelRatio;
ctx.scale(devicePixelRatio, devicePixelRatio);
var pariclesize = 2;

//canvas.width
//canvas.height are constant values even when the window is resized, the value remains the same, the elements within the canvas gets resized to fit the position and size of the canvas


class Vector2{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
	VectorAddition(Vector2B){
		this.x = this.x + Vector2B.x;
		this.y = this.y + Vector2B.y;
	}
}
class Particle {

	//AttractionDistanceLimit = 100;
	constructor(x, y, c, AttractionDistance = 10000, RepulsionDistance = 150) {
    	this.AttractionDistance = AttractionDistance;
    	this.RepulsionDistance = RepulsionDistance;
	    this.pos = new Vector2();
    	this.force = new Vector2();
    	this.velocity = new Vector2();
		this.pos.x = x;
		this.pos.y = y;
		this.c = c;
		this.AttractionDistance = AttractionDistance;
	}

	RenderParticle(actx){
		actx.fillStyle = this.c;
		actx.fillRect(this.pos.x / devicePixelRatio - pariclesize, this.pos.y / devicePixelRatio - pariclesize, pariclesize, pariclesize);
		
	}
}
var LastUpdateTime = Date.now();
var ParticleAmt = 2500;
var EachParticleAmt;
var MouseParticle = [];
var Intensity = document.getElementById('Intensity').value;
var AirResistance = 0.3; // 0.75 previously
var dtMultiplier = document.getElementById('dtMultiplier').value;
var dtMax = 24;

var NumOfTypes = 0;
var TypeArray = [];
var ForceArray = [];


var MousePos;
var MouseActive = false;
var MouseAttractStrength = document.getElementById('MouseAttractionValue').value;

//RandomiseForces();

console.log(canvas.height);
console.log(canvas.width);
console.log(RandomRange(1, 0));


function AdjustCanvasSize() {
	const styleWidth = canvas.clientWidth;
	const styleHeight = canvas.clientHeight;
	devicePixelRatio = window.devicePixelRatio || 1;

	canvas.width = styleWidth * devicePixelRatio;
	canvas.height = styleHeight * devicePixelRatio;

	// Scale the canvas context to account for the device pixel ratio
	ctx.scale(devicePixelRatio, devicePixelRatio);
}

function RandomiseForces(){
	for (let i = 0; i < NumOfTypes; i++){
		for (let j = 0; j < NumOfTypes; j++){
			ForceArray[i][j] = RandomRange(1, -1);
		}
	}
}
function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
function RandomisePositions(particles){
	for (var i = 0; i < particles.length; i++){
		particles[i].pos.x = Math.random() * canvas.width;
		particles[i].pos.y = Math.random() * canvas.height;
	}
}

function RandomRange(Max, Min){
	return Math.random() * (Max - Min) + Min;
}


function Attraction(particles1, particlesarrays, attractionarray){
	if(particles1 == undefined){
		return 0;
	}
	for (var i = 0; i < particles1.length; i++){
		particles1[i].force.x = 0;
        particles1[i].force.y = 0;
		for (var j = 0; j < particlesarrays.length; j++){
			for (var v = 0; v < particlesarrays[j].length; v++){
				AddParticleForces(particles1[i], particlesarrays[j][v], attractionarray[j]);
			}
		}
	}
}

function AddParticleForces(particle1, particle2, attraction){
	var DiffX = particle1.pos.x - particle2.pos.x;
	var DiffY = particle1.pos.y - particle2.pos.y;
	var Distance = DiffX * DiffX + DiffY * DiffY;
	
	
	if (Distance < particle2.RepulsionDistance){
		let ActualDist;
		if(Distance > 0){
			ActualDist = Math.sqrt(Distance);
		}
		else{
			ActualDist = 1;
		}
		var AtomRepulsionForce = Math.abs(attraction * Intensity) * 3 * 1/ActualDist;
		particle1.force.x += AtomRepulsionForce * DiffX / ActualDist;
		particle1.force.y += AtomRepulsionForce * DiffY / ActualDist;
	}
	else if (Distance < particle2.AttractionDistance){
		let ActualDist;
		if(Distance > 0){
			ActualDist = Math.sqrt(Distance);
		}
		else{
			ActualDist = 1;
		}
		var AttractionForce = (attraction * Intensity) * 1/ActualDist;
		particle1.force.x += AttractionForce * DiffX / ActualDist;
		particle1.force.y += AttractionForce * DiffY / ActualDist;
	}
	
}
function UpdateParticlesVelPos(particle, dt){
	
	    // Apply air resistance
    particle.velocity.x *= AirResistance;
    particle.velocity.y *= AirResistance;
	
	// Update velocity with force
    particle.velocity.x += particle.force.x  * dt;
    particle.velocity.y += particle.force.y  * dt;
	
	var NewPos = new Vector2(particle.pos.x + particle.velocity.x * dt, particle.pos.y +  particle.velocity.y * dt);
	
	if (NewPos.x > pariclesize && NewPos.x < canvas.width){
		particle.pos.x = NewPos.x;
	}
	else{
		if (NewPos.x < pariclesize){
			particle.pos.x = pariclesize;
		}
		else{
			particle.pos.x = canvas.width;
			particle.velocity.x = -particle.velocity.x;
		}
	}
	if (NewPos.y > pariclesize && NewPos.y < canvas.height){
		particle.pos.y = NewPos.y;
	}
	else{
		if (NewPos.y < pariclesize){
			particle.pos.y = pariclesize;
		}
		else{
			particle.pos.y = canvas.height;
			particle.velocity.y = -particle.velocity.y;
		}
	}
	//particle.velocity.x = 0;
	//particle.velocity.y = 0;
}
function ParticleAmtChange(particles, amount){
	//var previouslength = particles.length;
	var lengthDiff = Math.abs(particles.length - amount);
	if (particles.length > amount){
		for (let i = 0; i < lengthDiff; i++){
			particles.pop();
		}
	}
	else{
		for (let i = 0; i < lengthDiff; i++){
			var newcolor;
			if (particles[0] == undefined){
				newcolor = getRandomRGBColor();
			}
			else{
				newcolor = particles[0].c;
			}
			particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, newcolor));
		}
	}
}

function CreateParticleForceInput(newvalue){
		let ForceAttraction = document.createElement("INPUT");
		ForceAttraction.classList.add("ForceAttraction");
		ForceAttraction.setAttribute("type", "number");
		ForceAttraction.value = newvalue;
		return(ForceAttraction);
}
function AddForceAttractionListener(ForceAttraction, ForceArray, CurrentForceArray){
    ForceAttraction.addEventListener("change", function(){
		let TypeInteractionContainers = document.querySelectorAll(".TypeInteractionContainer");
		let ThisSingleForceContainer = ForceAttraction.parentNode;
		let ThisTypeInteractContainer = ThisSingleForceContainer.parentNode.parentNode;
		let SingleForceContainers = ThisTypeInteractContainer.querySelectorAll(".SingleForceContainer");

		let FirstIndex;
		for (let find = 0; find < TypeInteractionContainers.length; find++){
			if(TypeInteractionContainers[find] == ThisTypeInteractContainer){
				FirstIndex = find;
			}
		}
		let SecondIndex;
		for (let find = 0; find < SingleForceContainers.length; find++){
			if(SingleForceContainers[find] == ThisSingleForceContainer){
				SecondIndex = find;
			}
		}
		console.log(FirstIndex + ', ' + SecondIndex);
		ForceArray[FirstIndex][SecondIndex] = ForceAttraction.value;
		console.log("Changed: " + CurrentForceArray);
	});
}
function CreateNewParticleType(){
	var ForceContainers = document.querySelectorAll(".ForceContainer");
	let NewIndex = TypeArray.push([]) - 1;
	let newcolor = getRandomRGBColor();
	NumOfTypes++;
	for (let i = 0; i < EachParticleAmt; i++){
		TypeArray[NewIndex].push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, newcolor));
	}
	
	ForceArray.push([]);
	
	let TypeInteractionContainer = document.createElement("div");
	let ForceContainer = document.createElement("div");
	let CurrentTypeArray = TypeArray[NewIndex];
	let ParticleAmountText = document.createElement("p");
	let ParticleAmountInput = document.createElement("INPUT");
	ForceContainer.classList.add("ForceContainer");
	TypeInteractionContainer.classList.add("TypeInteractionContainer");
	//TypeInteractionContainer.classList.add("centered");
	
	ParticleAmountText.appendChild(document.createTextNode("Number: "));
	
	TypeInteractionContainer.appendChild(ParticleAmountText);
	TypeInteractionContainer.appendChild(ParticleAmountInput);
	
	
	let RemoveTypeButton = document.createElement("a");
	RemoveTypeButton.classList.add("TranslateButton");
	RemoveTypeButton.appendChild(document.createTextNode("X"));
	RemoveTypeButton.style.background = "red";
	RemoveTypeButton.style.padding = "0.5em";
	TypeInteractionContainer.appendChild(RemoveTypeButton);
	RemoveTypeButton.addEventListener('click', function() {
		let CurrentIndex = TypeArray.indexOf(CurrentTypeArray);
		TypeArray.splice(CurrentIndex, 1);
		ForceArray.splice(CurrentIndex, 1);
		NumOfTypes--;
		TypeInteractionContainer.remove();
		ForceContainers = document.querySelectorAll(".ForceContainer");
		console.log("Start");
		for (let typenum = 0; typenum < NumOfTypes; typenum++){
			console.log(typenum);
			ForceArray[typenum].splice(CurrentIndex, 1);
			console.log(ForceContainers[typenum].querySelectorAll(".SingleForceContainer"));
			ForceContainers[typenum].querySelectorAll(".SingleForceContainer")[CurrentIndex].remove();
			console.log(ForceContainers[typenum].querySelectorAll(".SingleForceContainer"));
			console.log(ForceContainers);
		}
		console.log("End");
	});
	
	TypeInteractionContainer.appendChild(ForceContainer);
	document.querySelector("#TypeInteractionWrapper").appendChild(TypeInteractionContainer);
	
	
	// Creating Particle Amount Input For Each Particle Type
	
	ParticleAmountInput.setAttribute("type", "number");
	ParticleAmountInput.value = EachParticleAmt;
	ParticleAmountInput.classList.add("ParticleAmount");
	ParticleAmountInput.style.backgroundColor = newcolor; // change later
	ParticleAmountInput.addEventListener("change", function() {
		ParticleAmtChange(CurrentTypeArray, ParticleAmountInput.value);
	});
	
	
	
	for (let j = 0; j < NumOfTypes; j++) {
		console.log(j);
		let SingleForceContainer = document.createElement("div");
		SingleForceContainer.classList.add("SingleForceContainer");
		ForceContainer.appendChild(SingleForceContainer);
	
		let FirstColor = document.createElement("div");
		FirstColor.style.background = newcolor;
		FirstColor.classList.add("ColorBlock");
		SingleForceContainer.appendChild(FirstColor);
		
		SingleForceContainer.appendChild(document.createElement("p").appendChild(document.createTextNode("X")));
		
		let SecondColor = document.createElement("div");
		console.log(document.querySelectorAll(".TypeInteractionContainer")[j]);
		SecondColor.style.background = document.querySelectorAll(".TypeInteractionContainer")[j].querySelector(".SingleForceContainer").querySelector(".ColorBlock").style.backgroundColor;
		SecondColor.classList.add("ColorBlock");
		SingleForceContainer.appendChild(SecondColor);
		
		
		ForceArray[NewIndex].push(RandomRange(1, -1));
		let ForceAttraction = CreateParticleForceInput(ForceArray[NewIndex][j]);
		SingleForceContainer.appendChild(ForceAttraction);
		let CurrentForceArray = ForceArray[NewIndex][j];
		AddForceAttractionListener(ForceAttraction, ForceArray, CurrentForceArray);
		
		
		if (j < NumOfTypes - 1){
			ForceArray[j].push(RandomRange(1, -1));
			let OtherSingleForceContainer = document.createElement("div");
			OtherSingleForceContainer.classList.add("SingleForceContainer");
			
			let OtherFirstColor = document.createElement("div");
			OtherFirstColor.style.background = document.querySelectorAll(".TypeInteractionContainer")[j].querySelector(".SingleForceContainer").querySelector(".ColorBlock").style.backgroundColor;
			
			OtherFirstColor.classList.add("ColorBlock");
			OtherSingleForceContainer.appendChild(OtherFirstColor);

			OtherSingleForceContainer.appendChild(document.createElement("p").appendChild(document.createTextNode("X")));
			
			let OtherSecondColor = document.createElement("div");
			OtherSecondColor.style.background = newcolor;
			OtherSecondColor.classList.add("ColorBlock");
			OtherSingleForceContainer.appendChild(OtherSecondColor);
			
			
			let OtherForceAttraction = CreateParticleForceInput(ForceArray[j][NewIndex]);
			OtherSingleForceContainer.appendChild(OtherForceAttraction);
			ForceContainers[j].appendChild(OtherSingleForceContainer);
			let OtherCurrentForceArray = ForceArray[j][NewIndex];
			AddForceAttractionListener(OtherForceAttraction, ForceArray, OtherCurrentForceArray);
		}
	}
}
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    return new Vector2(x, y);
}
// Function to get touch position
function getTouchPosition(canvas, touchEvent) {
    var rect = canvas.getBoundingClientRect();
	let x = (touchEvent.touches[0].clientX - rect.left) * scaleX;
    let y = (touchEvent.touches[0].clientY - rect.top) * scaleY;
    return new Vector2(x, y);
}


canvas.addEventListener('mousedown', function(event) {
    MouseActive = true;
    MousePos = getMousePosition(canvas, event);
});

canvas.addEventListener('mouseup', function() {
    MouseActive = false;
});

canvas.addEventListener('mousemove', function(event) {
    if (MouseActive) {
        MousePos = getMousePosition(canvas, event);
    }
});



// Add touch event listeners
canvas.addEventListener('touchstart', function(event) {
    MouseActive = true;
    MousePos = getTouchPosition(canvas, event);
    event.preventDefault(); // Prevent scrolling when touching the canvas
});

canvas.addEventListener('touchend', function() {
    MouseActive = false;
});

canvas.addEventListener('touchmove', function(event) {
    if (MouseActive) {
        MousePos = getTouchPosition(canvas, event);
        event.preventDefault(); // Prevent scrolling when touching the canvas
    }
});


function Init(){
	
	EachParticleAmt = ParticleAmt / 4;
	for (let i = 0; i < 4; i++) {
		CreateNewParticleType();
	}
	
	MouseParticle.push(new Particle(0,0 ,"white", document.getElementById('MouseRangeValue').value, -1));
	

}
function Update(){
	if (PageList[2].style.display != "none"){
		//i think all of these needs to happen before we change the position, maybe we separate the change in velocity and position from the attraction function?
		
		var NewUpdateTime = Date.now();
		var dt = Math.min(Math.max((NewUpdateTime - LastUpdateTime), 0), dtMax) * dtMultiplier;
		LastUpdateTime = NewUpdateTime;
		//console.log(dt);
		//console.log(ForceArray[0][0]);
		
		if (MouseActive){
			//MousePos = getMousePosition(canvas, e);
			MouseParticle[0].pos = MousePos;
			
			
			
			let MouseTypeArray = TypeArray.map(function(innerArray) {
                return innerArray.slice();
            });
            let MouseForceArray = ForceArray.map(function(innerArray) {
                return innerArray.slice();
            });
			MouseTypeArray.push(MouseParticle);
			for (let i = 0; i < NumOfTypes + 1; i++){
				if (i < NumOfTypes){
					MouseForceArray[i].push(MouseAttractStrength);
				}
				//Attraction(TypeArray[i], TypeArray, ForceArray[i]);
				Attraction(TypeArray[i], MouseTypeArray, MouseForceArray[i]);
			}
			
			//console.log(ForceArray[1])
			//MouseActive = false;
			//console.log(MouseParticle[0].pos);
			
		}
		else{
			for (let i = 0; i < NumOfTypes; i++){
				Attraction(TypeArray[i], TypeArray, ForceArray[i]);
			}
		}
			
		for (let i = 0; i < NumOfTypes; i++){
			for (let j = 0; j < TypeArray[i].length; j++){
				UpdateParticlesVelPos(TypeArray[i][j], dt);
			}
		}

		
		Render();
		//MouseActive = false;
	}
	requestAnimationFrame(Update);
}
function Render(){
	AdjustCanvasSize();
	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	for (let i = 0; i < NumOfTypes; i++){
		for (let j = 0; j < TypeArray[i].length; j++){
			TypeArray[i][j].RenderParticle(ctx);
		}
	}
	if (MouseActive){
		MouseParticle[0].RenderParticle(ctx);
	}	
}
Init();
Update();

document.getElementById('randomise-forces-button').addEventListener('click', RandomiseForces);
document.getElementById('randomise-positions-button').addEventListener('click', function() {
	for (let i = 0; i < NumOfTypes; i++){
		RandomisePositions(TypeArray[i]);
	}
});



document.getElementById('add-new-type-button').addEventListener('click', function() {
	CreateNewParticleType();
});

document.getElementById('MouseAttractionValue').addEventListener("change", function() {
	console.log("Changed");
	MouseAttractStrength = document.getElementById('MouseAttractionValue').value;
});
document.getElementById('MouseRangeValue').addEventListener("change", function() {
	MouseParticle[0].AttractionDistance = document.getElementById('MouseRangeValue').value;
});
document.getElementById('Intensity').addEventListener("change", function() {
	Intensity = document.getElementById('Intensity').value;
});
document.getElementById('AirResistance').addEventListener("change", function() {
	AirResistance = document.getElementById('AirResistance').value;
});

document.getElementById('dtMultiplier').addEventListener("change", function() {
	dtMultiplier = document.getElementById('dtMultiplier').value;
});

/*

	EachParticleAmt = ParticleAmt / NumOfTypes;
	for (let i = 0; i < NumOfTypes; i++) {
		var newcolor = getRandomRGBColor();
		if (TypeArray[i] === undefined) {
			TypeArray[i] = [];
		}
		for (let j = 0; j < EachParticleAmt; j++){
			TypeArray[i].push(new Particle(Math.random() * canvas.width / 1.2625, Math.random() * canvas.height / 1.2625, newcolor));
		}
		ForceArray[i] = [];
		for (let j = 0; j < NumOfTypes; j++) {
			ForceArray[i].push(RandomRange(1, -1));
		}
	}
	
*/
