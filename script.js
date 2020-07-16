var doors = document.querySelectorAll('.door');
var directions = document.getElementById("directions");
var button = document.getElementsByClassName('selection');
var body = document.querySelector("body");
var playButton = document.getElementById('play-button');

let doorPicked = false;
let zonks = [];
let pickedDoor;
let random;
let zonkOne;
let zonkTwo;
let openDoor;
let remainingDoors = [];


//assign the losing doors to an array
function assignDoors() {
	//do not allow a second door to be clicked
	if (doorPicked) return;
	pickedDoor = this;
	pickedDoor.lastElementChild.style.visibility = "visible";
	doorPicked = true;
	// if the door is not the winning door, assign it to the zonks array
	for (var i=0; i<doors.length; i++) {
		if(doors[i] != winner) {
			zonks.push(doors[i]);
		} 
	};
	// randomly assign the zonks doors to variables
	random = Math.floor(Math.random()*2);
	for (var i=0; i<zonks.length; i++) {
		if (i === random) {
		zonkOne = zonks[i];
	} else {
		zonkTwo = zonks[i];
	};
	}
	openADoor();
}

//determine which door to open
setTimeout (function openADoor() {
	//if the winning door is picked, open the zonk door that was randomly chosen as zonkOne
	if (winner === pickedDoor) {
		zonkOne.classList.add("goat");
		openDoor = zonkOne;
	//if zonkOne was picked, open zonkTwo
	} else if (zonkOne === pickedDoor) {
		zonkTwo.classList.add("goat");
		openDoor = zonkTwo;
	//if zonkTwo was picked, open zonkOne
	} else {
		zonkOne.classList.add("goat");
		openDoor = zonkOne;
	}
	//Now that one of the zonk doors is open, the player decides if they want to switch doors
	directions.textContent = "Would you like to switch doors?";
	//can now see yes and no buttons 
	for (var i=0; i<button.length; i++) {
		button[i].style.visibility = "visible";
		button[i].addEventListener("click", decisionTime);
	}
}, 3000);


//player picks yes or no button to switch doors
function decisionTime() {
	let pickedButton = this;
	let yesButton = button[0];
	let noButton = button[1];
	for (var i=0; i<doors.length; i++) {
		if(doors[i] != openDoor) {
			remainingDoors.push(doors[i]);
		}
	}
	//if they pick yes, switch pickedDoor to other unopen door
	//if they pick no, do nothing
	if(pickedButton === yesButton) {
		//switch picked door
		if(pickedDoor === remainingDoors[0]) {
			pickedDoor = remainingDoors[1];
			remainingDoors[0].lastElementChild.style.visibility = "hidden";
			pickedDoor.lastElementChild.style.visibility = "visible";
		} else {
			pickedDoor = remainingDoors[0];
			remainingDoors[1].lastElementChild.style.visibility = "hidden";
			pickedDoor.lastElementChild.style.visibility = "visible";
		}
	}	
	//is the picked door the same as the winning door? 
	setTimeout(function determineWinner(){
	if(pickedDoor === winner) {
		directions.textContent = "You won!!";
		body.style.background = "url('img/confetti.jpg') center center / cover";
	} else {
		directions.textContent = "Sorry. Play again?"
	}
	winner.classList.add("winner");
	for(var i=0; i<doors.length; i++){
		if(doors[i] != winner) {
		doors[i].classList.add("goat");
	}}
	for (var i=0; i<button.length; i++) {
		button[i].style.visibility = "hidden";
	}
}, 1500);
}

//randomly choose a winning door
let randomNumber = Math.floor(Math.random()*3);
let winner = doors[randomNumber];	

//press button to play game
playButton.addEventListener("click", function() {
	//add event listener to doors
	for (var i=0; i<doors.length; i++) {
	doors[i].addEventListener("click", assignDoors);
	directions.style.visibility = "visible";
	playButton.style.visibility = "hidden";
	}
})

