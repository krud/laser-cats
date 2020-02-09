document.addEventListener("DOMContentLoaded", postLoad);

const gameArea = document.querySelector('.game')

let score = 0;
let asteroidInterval;
let asteroids;
let lasers;
let cat;
let player;
let playerAngle;
let newAngle;
let myAngle;

function postLoad() {
    messageBoard = document.querySelector(".message-board");
    const start = document.querySelector(".start");

    start.addEventListener("click", startGame)
}

function startGame(){
    event.preventDefault();

    hideMessageBoard();
    hideCat();
    createGame();
}

function hideMessageBoard(){
    const messageBoard = document.querySelector(".message-board");
    messageBoard.style.visibility = "hidden";
}

function hideCat(){
    cat = document.querySelector('.cat')
    player = document.querySelector('.player')

    player.style.display = "block"
    cat.style.display = "none"
}

function scoreBoard(){
   const scores = document.querySelector('h2')
   scores.textContent = `Score: ${score}`
}

function createGame(){
    // createVariables()
    window.addEventListener("keydown", angleCat)
    // playGame()
}

function moveUp(){
    myAngle = window.getComputedStyle(player).getPropertyValue('transform')
    const maxAngle = 'matrix(0.406737, -0.913545, 0.913545, 0.406737, 0, 0)'
    if (myAngle === maxAngle){
        return
    } else {
        playerAngle = findAngle(myAngle)
        newAngle = playerAngle - 2
        player.style.transform = `rotate(${newAngle}deg)`
    }
}
// rotate(Xdeg) = matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);

function findAngle(rotate){
    var values = rotate.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    var angleCos = values[0]
    var angleSin = values[1]

    var angle = Math.round(Math.atan2(angleSin, angleCos) * (180/Math.PI));
    
    return angle 
}

function moveDown(){
    myAngle = window.getComputedStyle(player).getPropertyValue('transform')
    const maxAngle = 'matrix(0.997564, -0.0697565, 0.0697565, 0.997564, 0, 0)'
    if (myAngle === maxAngle){
        return
    } else {
        playerAngle = findAngle(myAngle)
        newAngle = playerAngle + 2
        player.style.transform = `rotate(${newAngle}deg)`
    }
}

function angleCat(event){
    if (event.key === "ArrowUp"){
        event.preventDefault()
        moveUp()
    } else if (event.key === "ArrowDown") {
        event.preventDefault()
        moveDown()
    } else if (event.key === " ") {
        event.preventDefault()
        fireLaser()
    }
}