let doors = document.querySelectorAll('.door');
let directions = document.getElementById("directions");
let button = document.getElementsByClassName('selection');
let body = document.querySelector("body");
let playButton = document.getElementById('play-button');

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
	//show what door was selected
	pickedDoor.lastElementChild.style.visibility = "visible";
	doorPicked = true;
	// if the door is not the winning door, assign it to the zonks array
	for (let i=0; i<doors.length; i++) {
		if(doors[i] != winner) {
			zonks.push(doors[i]);
		} 
	};
	// randomly assign the zonks doors to variables
	random = Math.floor(Math.random()*2);
	for (let i=0; i<zonks.length; i++) {
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
	for (let i=0; i<button.length; i++) {
		button[i].style.display = "inline";
		button[i].addEventListener("click", decisionTime);
	}
}, 3000);


//player picks yes or no button to switch doors
function decisionTime() {
	let pickedButton = this;
	let yesButton = button[0];
	let noButton = button[1];
	for (let i=0; i<doors.length; i++) {
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
			//show what door was selected
			remainingDoors[0].lastElementChild.style.visibility = "hidden";
			pickedDoor.lastElementChild.style.visibility = "visible";
		} else {
			pickedDoor = remainingDoors[0];
			//show what door was selected
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
	//show the car and goats behind the door
	winner.classList.add("winner");
	for(let i=0; i<doors.length; i++){
		if(doors[i] != winner) {
		doors[i].classList.add("goat");
	}}
	//hide the yes and no buttons 
	for (let i=0; i<button.length; i++) {
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
	for (let i=0; i<doors.length; i++) {
	doors[i].addEventListener("click", assignDoors);
	//show directions
	directions.style.visibility = "visible";
	//hide play button after it is clicked
	playButton.style.display = "none";
	}
})

