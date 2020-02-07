document.addEventListener("DOMContentLoaded", postLoad);

let score = 0;
let messageBoardEnd;
let gameOver;
let message;
let game;
let gameContext;
let gameWidth;
let gameHeight;
let gameCenterX;
let gameCenterY;

function postLoad() {
    messageBoard = document.querySelector(".message-board");
    let startButton = document.querySelector(".start");

    startButton.addEventListener("click", startGame)
}

function startGame(){
    event.preventDefault();
    messageBoard.style.visibility = "hidden";
    hideCat();
    createGame();
}

function hideCat(){
    let cat = document.querySelector('.cat')
    let player = document.querySelector('.player')

    player.style.display = "block"
    cat.style.display = "none"
}

function scoreBoard(){
   let scores = document.querySelector('h2')
   scores.textContent = `Score: ${score}`
}

function createGame(){
    createVariables()
    // playGame()
}

function createVariables(){
    game = document.getElementById("canvas")

    gameContext = game.getContext('2d');
    gameWidth = 50;
    gameHeight = 30;
    gameCenterX = gameWidth / 2;
    gameCenterY = gameHeight / 2;

    game.width = gameWidth;
    game.height = gameHeight;

    game.focus();
}