document.addEventListener("DOMContentLoaded", postLoad);

let score = 0;
let asteroidInterval;
let asteroids;
let lasers;
let cat;
let player;
let playerAngle;
let newAngle;
let myAngle;
let gameArea;

function postLoad() {
    messageBoard = document.querySelector(".message-board");
    player = document.querySelector('.player')
    const start = document.querySelector(".start");
    gameArea = document.querySelector('.game')

    start.addEventListener("click", startGame)
}

function startGame(){
    event.preventDefault();

    hideMessageBoard();
    hideCat();
    playGame();
}

function hideMessageBoard(){
    const messageBoard = document.querySelector(".message-board");
    messageBoard.style.visibility = "hidden";
}

function hideCat(){
    cat = document.querySelector('.cat')

    player.style.display = "block"
    cat.style.display = "none"
}

function playGame(){
    asteroidInterval = setInterval(() => {createAsteroid()}, 2100)
    window.addEventListener("keydown", angleCat)
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

function fireLaser(){
    let laser = createLaserElement()
    gameArea.appendChild(laser)
    moveLaser(laser)
}

function createLaserElement(){
    myAngle = window.getComputedStyle(player).getPropertyValue('transform')
    playerAngle = findAngle(myAngle)

    let xPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(player).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = 'resources/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.top = `${yPosition - 69}px`
    newLaser.style.transform = `rotate(${playerAngle}deg)`
    newLaser.style.left = `${xPosition - 24}px`
    return newLaser
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let yPosition = parseInt(laser.style.top)
        let asteroids = document.querySelectorAll('.asteroid')

        asteroids.forEach(asteroid => {
            if (hit(laser, asteroid)){
                asteroid.src = 'https://purepng.com/public/uploads/large/purepng.com-explosionnaturesmokefireflamewardangerexplosionburnblastburst-961524672225kqu1g.png'
                asteroid.classList.remove('asteroid')
                asteroid.classList.add('destroyed')
                score += 100
                scoreBoard()
            }
        })
        if (xPosition >= 660) {
            laser.remove()
        } else {
            // below is perfect only if the angle is -20 must use a formula to position based on the angle 
            laser.style.left = `${xPosition + 4}px`
            laser.style.top = `${yPosition - 1}px`
        }
    }, 10)
}

function createAsteroid(){
    let newAsteroid = document.createElement('img')
    newAsteroid.classList.add('asteroid')
    newAsteroid.src = 'resources/asteroid.png'
    newAsteroid.style.left = '46rem'
    newAsteroid.style.top = `${Math.floor(Math.random()* 6)}rem`
    gameArea.appendChild(newAsteroid) 
    moveAsteroid(newAsteroid)
}

function moveAsteroid(asteroid){
    let moveAsteroidInterval = setInterval(()=>{
        let xPosition = parseInt(window.getComputedStyle(asteroid).getPropertyValue('left'))    
        if (xPosition <= 50){
            if(Array.from(asteroid.classList).includes('destroyed')){
                asteroid.remove()
            } else {
                gameOver()
            }
        } else {
            asteroid.style.left = `${xPosition - 1}px`
        }
    })
}

function hit(laser, asteroid){
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let asteroidLeft = parseInt(asteroid.style.left)
    let asteroidTop = parseInt(asteroid.style.top)
    let asteroidBottom = asteroidTop - 4

    // collision hit calcuation are not quite correct....
    if (laserLeft != 670 && laserLeft <= asteroidLeft){
        if(laserTop <= asteroidTop && laserTop >= asteroidBottom){
            return true 
        } else {
            return false
        } 
    } else {
        return false 
    }
}

function scoreBoard(){
    const scores = document.querySelector('h2')
    scores.textContent = `Score: ${score}`
 }

 function gameOver(){
    window.removeEventListener("keydown", angleCat)
    clearInterval(asteroidInterval)

    removeElements()
    showMessageBoardEnd()
    const restart = document.querySelector('.restart')
    restart.addEventListener('click', restartGame)
 }

 function removeElements(){
    asteroids = document.querySelectorAll('.asteroid')
    asteroids.forEach(asteroid => asteroid.remove())
    lasers = document.querySelectorAll('.laser')
    lasers.forEach(laser => laser.remove())
 }

function showMessageBoardEnd(){
    const messageBoardEnd = document.querySelector(".message-board-end");
    messageBoardEnd.style.visibility = "visible";
}

function restartGame(){
    const messageBoardEnd = document.querySelector(".message-board-end");
    messageBoardEnd.style.visibility = "hidden"
    score = 0
    scoreBoard()
    playGame()
}