'use strict';

//Snake:
const canvas = document.querySelector("canvas");
const contexte = canvas.getContext('2d');//Définis le contexte dans le lequel se passe le jeu en 2D

let box = 20;
let snake = [];
//Création de nouriture pour le serpent de façon alléatoire:
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let score = 0;
let dir;

//Position du serpent:
snake[0] = { x: 10*box, y: 10*box }

//Association d'un évènement aux touches du clavier pour diriger:
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;

    if(key == 37 && dir != "RIGHT") {//La touche; fleche gauche  correspond au code 37
        dir = "LEFT";
    } else if (key == 38 && dir != "DOWN") {
        dir = "UP";
    } else if (key == 39 && dir !="LEFT") {
        dir = "RIGHT";
    } else if (key == 40 && dir !="UP") {
        dir = "DOWN";
    }
}

function draw() {
    contexte.clearRect(0, 0, 400, 400)

    for(let i = 0; i < snake.length; i++){
        contexte.fillStyle = (i == 0) ? "#686bae" : "white";
        contexte.fillRect(snake[i].x, snake[i].y, box, box);
        contexte.strokeStyle = "#e5d2e0";
        contexte.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    contexte.fillStyle = "#f1eda3";
    contexte.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(dir == "LEFT") snakeX -= box;
    if(dir == "UP") snakeY -= box;
    if(dir == "RIGHT") snakeX += box;
    if(dir == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        snake.pop()
    }


let newHead = {
    x: snakeX,
    y: snakeY
}

if(snakeX < 0 || snakeY < 0 || snakeX > 19*box || snakeY > 19*box || collision(newHead, snake)) {
    clearInterval(game);
    alert("Vous avez perdu !");
}

snake.unshift(newHead);

contexte.fillStyle = "#686bae";
contexte.font = "30px Arial";
contexte.fillText(score, 2*box, 1.6*box)

}

function collision(head, array) {
    for(let g = 0; g < array.length; g++) {
        if(head.x == array[g].x && head.y == array[g].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 100);

//Flying Ducky:
