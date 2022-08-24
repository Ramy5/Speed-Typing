"use strict";

// selection
const select = document.querySelector(".lvl-select");
const lvlName = document.querySelector(".lvl-name");
const lvlSocend = document.querySelector(".lvl-socend");
const speedLeft = document.querySelector(".speed-left");
const scoreFrom = document.querySelector(".score-from");
const scoreTotal = document.querySelector(".total");
const startPlay = document.querySelector(".start");
const inputField = document.querySelector(".word-input");
const theWord = document.querySelector(".the-word");
const upComingWord = document.querySelector(".upcoming-word");
const popup = document.querySelector(".popup");
const divPopup = document.querySelector(".popup div");
const finish = document.querySelector(".finish");
const btnAgain = document.querySelector(".again");

// sounds
let selectSound = new Audio("sounds/select.wav");
selectSound.volume = 0.5;
let winSound = new Audio("sounds/win.wav");
winSound.volume = 0.6;
let loseSound = new Audio("sounds/lose.wav");
loseSound.volume = 0.5;
let popupSound = new Audio("sounds/popup-count.wav");
popupSound.volume = 0.5;
let finalWinSound = new Audio("sounds/final-win.wav");
finalWinSound.volume = 0.5;

// functions
// function for default data
const defaultData = function () {
  lvlName.textContent = select.value;
  lvlSocend.textContent = lvls[lvlName.textContent];
  speedLeft.textContent = lvlSocend.textContent;
  scoreTotal.textContent = difficult[select.value].length;
};

// disaple paste event
inputField.onpaste = () => false;

// function for generate random word and add it to page
const generateWord = function () {
  inputField.focus();
  const word =
    difficult[select.value][
      Math.trunc(Math.random() * difficult[select.value].length)
    ];
  // add word to page
  theWord.textContent = word;
  // delete word from array
  const wordIndex = difficult[select.value].indexOf(word);
  difficult[select.value].splice(wordIndex, 1);

  // add rest of the word in up coming word
  comingWord();
};

// function for up coming word
const comingWord = function () {
  upComingWord.textContent = "";
  for (let i = 0; i < difficult[select.value].length; i++) {
    const div = document.createElement("div");
    const text = document.createTextNode(difficult[select.value][i]);
    div.appendChild(text);
    upComingWord.appendChild(div);
  }
};

//function for speed left with interval
const speedLeftFn = () => {
  const speedCount = setInterval(() => {
    speedLeft.textContent--;
    if (speedLeft.textContent == 0) {
      speedLeft.textContent = lvlSocend.textContent;
      // when word lists is finished then the game is finished so display the final score
      if (difficult[select.value].length === 0) {
        if (
          theWord.textContent.toLowerCase() ===
          inputField.value.toLowerCase().trim()
        ) {
          scoreFrom.textContent++;
        }

        finalWinSound.play();
        clearInterval(speedCount); // when array is empty
        finish.textContent = "";
        upComingWord.remove();
        // div for final score when array is empty
        const winFinal = document.createElement("div");
        const winFinalText = document.createTextNode(
          `Score is ${scoreFrom.textContent} 🎉`
        );
        winFinal.classList.add("final");
        winFinal.appendChild(winFinalText);
        finish.appendChild(winFinal);
      }
      if (
        theWord.textContent.toLowerCase() ===
        inputField.value.toLowerCase().trim()
      ) {
        // when array is not empty then keep playing
        if (difficult[select.value].length > 0) {
          // call generate function to add another word
          generateWord();
          finish.textContent = "";
          scoreFrom.textContent++;
          inputField.value = "";
          // when word is correct create div for correct
          winSound.play();
          const winDiv = document.createElement("div");
          const winText = document.createTextNode("Correct 👌");
          winDiv.classList.add("win");
          winDiv.appendChild(winText);
          finish.appendChild(winDiv);
        }
      } else {
        if (difficult[select.value].length > 0) {
          finish.textContent = "";
          inputField.value = "";
          loseSound.play();
          const loseDiv = document.createElement("div");
          const loseText = document.createTextNode("Wrong 👎");
          loseDiv.classList.add("lose");
          loseDiv.appendChild(loseText);
          finish.appendChild(loseDiv);
          generateWord();
        }
      }
    } else {
      finish.textContent = "";
    }
  }, 1000);
};

// function for popup with interval
const popupFn = function () {
  divPopup.textContent = 3;
  const popupCount = setInterval(() => {
    popupSound.play();
    divPopup.textContent--;
    if (divPopup.textContent == 0) {
      clearInterval(popupCount);
      popup.classList.add("hidden");
      // after popup hidden,then start count down
      speedLeftFn();
    }
  }, 1000);
};

// lvls data
const lvls = {
  easy: 5,
  normal: 4,
  hard: 5,
};

// difficullty data
const difficult = {
  easy: [
    "Hello",
    "Easy",
    "Say",
    "Welcome",
    "Funny",
    "Happy",
    "Solve",
    "Reject",
    "Accept",
    "Win",
    "Title",
    "Score",
    "Type",
    "Above",
    "Across",
    "Address",
    "Affect",
    "Agency",
    "Alone",
    "Always",
    "Appear",
    "Arrive",
    "Around",
    "Author",
    "Close",
    "College",
    "Color",
    "Dome",
    "Death",
    "Develop",
  ],
  normal: [
    "Development",
    "Programming",
    "Discussion",
    "Environment",
    "Experience",
    "Generation",
    "Information",
    "International",
    "Management",
    "Organization",
    "Performance",
    "Professional",
    "Relationship",
    "Responsibility",
    "Understand",
    "Traditional",
    "Throughout",
    "Administration",
    "Commercial",
    "Conference",
    "Establish",
    "Circumstances",
    "Convention",
    "Distinction",
    "Disposition",
    "Notwithstanding",
    "Substantial",
    "Conspicuous",
    "Extravagant",
    "Philosophical",
  ],
  hard: [
    "I have driven a car",
    "Do you play basketball",
    "They have a computer",
    "Did he cook dinner",
    "They broke the glass",
    "We have won the match",
    "They talk too much",
    "I run every weekend",
    "Does he drink coffee",
    "She buys the car",
    "I like to draw pictures",
    "We love flying kites",
    "He has a big house",
    "Dog barks loudly",
    "I like comics books",
  ],
};

// add main (default) data
defaultData();
scoreFrom.textContent = 0;

// when click on select change data
select.addEventListener("click", function () {
  selectSound.play();
  defaultData();
});

// when click on start playing button
startPlay.addEventListener("click", function () {
  finish.textContent = "";
  inputField.focus();
  // show play again button
  btnAgain.classList.remove("hidden");
  // generate and choose random word
  generateWord();
  // popup before start
  popup.classList.remove("hidden");
  popupFn();
  startPlay.remove();
  select.remove();
});

// when click on play again button reload the page
btnAgain.addEventListener("click", () => location.reload());
