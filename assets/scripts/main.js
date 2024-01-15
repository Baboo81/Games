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
let moveSpeed = 3, grativy = 0.5;
let duck = document.querySelector('duck');
//let img = document.getElementById('bird-1');

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let score_Values = document.querySelector('.scoreValue');
let msg = document.querySelector('.message');
let score_Title = document.querySelector('.scoreTitle');
let game_state = 'Start';


img.style.display = 'none';
msg.classList.add('maessageStyle');

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && game_state != 'Play') {
        document.querySelector('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        duck.style.top = '40vh';
        game_state = 'Play';
        msg.innerHTML = '';
        score_Title.innerHTML = 'Score : ';
        score_Values.innerHTML = '0';
        msg.classList.remove('messageStyle');
        play();
    }
});

function play () {
    function move () {
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top) {
                    game_state = 'End';
                    msg.innerHTML = 'Game Over' . fontcolor('red') + '<br/>Press Enter To Restart';
                    msg.classList.add('messageStyle');
                    img.style.display = 'none';
                    return;
                } else {
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1') {
                        score_Values.innerHTML =+ score_Values + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let duck_dy = 0;
    function apply_gravity() {
        if(game_state != 'Play') return;
        duck_dy = duck_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == '') {
                img.src = '/assets/img/canard.svg';
                duck_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ''){
                img.src = '/assets/img/canard2.svg';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            msg.style.left = '28vw';
            window.location.reload();
            msg.classList.remove('messageStyle');
            return;
        }
        duck.style.top = bird_props.top + duck_dy + 'px';
        bird_props = duck.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    //Création de pipes:
    let pipe_separation = 0;
    let pipe_gap = 35;

    function create_pipe () {
        if(game_state != 'Play') return;

        if(pipe_separation > 115) {
            pipe_separation = 0;
            let pipePos = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipePos - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipePos + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
