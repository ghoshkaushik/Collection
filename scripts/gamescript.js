/*
    Declaring the variables.
	1. The first one to hold the random number;
	2. The second one to understand when the user is pressing the SUBMIT button after putting his response
	3. The third one to get the User response
*/

var randomNum = Math.floor(Math.random() * 100) + 1;
var clickResult = document.getElementsByClassName('guessSubmit')[0];
var userResponse = document.getElementById('guessField');
var guesses = document.querySelector('.guesses');
var lowOrHi = document.querySelector('.lowOrHi');
var lastResult = document.querySelector('.lastResult');
var numOfTurns = 1;
var newGameButton;
var resultLine;

// this function will create the success message and also grey out the input field.
function createSuccessMsg()
{

// this will create the success msg	
	lastResult.textContent = 'Perfect Ans';
	resultLine = document.createElement('p');
	var resultLineText = document.createTextNode("Congratulation !! You Won");
	resultLine.appendChild(resultLineText);
	resultLine.style.backgroundColor = 'green';
    document.body.appendChild(resultLine);	

// to grey-out the input fields
 	greyOutFields();	
}


// this function will take the elements of the input class and then grey them out.
function greyOutFields()
{
	userResponse.value = '';
	clickResult.disabled = true;
	userResponse.disabled = true;
}


// will start the game once again
function newGamePlaying()
{
// this will create a 'new game' button and on the click of that the page will be refreshed and the game will start again.
	newGameButton = document.createElement('button');
	newGameButton.textContent = 'Start New Game';
	document.body.appendChild(newGameButton);
	newGameButton.onclick = function()
	{
		resetGame();
	}
}

// this will reset the input field and also if it is a newgame call the appropriate function
function resetGame()
{

	newGameButton.parentNode.removeChild(newGameButton);
	resultLine.textContent = '';
	activeOutFields();
	numOfTurns = 1;
	lastResult.textContent = '';
	lastResult.style.backgroundColor = 'white';
	lowOrHi.textContent = '';
	guesses.textContent = 'Previous Guesses: ';
	randomNum = Math.floor(Math.random() * 100) + 1;
	userResponse.focus();
}


// this function will take the elements of the input class and then make them active.
function activeOutFields()
{
	clickResult.disabled = false;
	userResponse.disabled = false;
}

// Captures the user response and formulate the o/p response accordingly.
function checkUserResponse()
{
	var inpNumber = Number(userResponse.value);
	guesses.textContent += inpNumber + ' ';
	if (inpNumber === randomNum)
	{
		lowOrHi.textContent = '';
		createSuccessMsg();
		newGamePlaying();
	}
	else 
	{   if (numOfTurns < 10)
		{
			
			if (inpNumber < randomNum)
			{
				lowOrHi.textContent = 'Value is too less. Try again';	
			}
			else
			{
				lowOrHi.textContent = 'Value is too big. Try again';
			}
			
			numOfTurns++;
			userResponse.value = '';
			userResponse.focus();		    
			lastResult.textContent = 'Wrong Ans';
			lastResult.style.backgroundColor = 'red';
		}
		else
		{
			// this will create the error msg after all turns are lost
			alert("in the error block");
			resultLine = document.createElement('p');
			resultLineText = document.createTextNode("Bad Luck!! You Lost. Try Again");
			resultLine.appendChild(resultLineText);
			document.body.appendChild(resultLine);
			resultLine.style.backgroundColor = 'red';
			greyOutFields();
			newGamePlaying();
		}
	}
}
guesses.textContent = 'Previous Guesses: ';
clickResult.onclick = function()
{
	checkUserResponse();
}
