const height = 14;
const width = 16;


let directions = [];
let lastdir = 'd';

let id = null;

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowUp":
        case "w": {
            directions.push('w')
            break;
        }
        case "ArrowLeft":
        case "a": {
            directions.push('a')
            break;
        }
        case "ArrowDown":
        case "s": {
            directions.push('s')
            break;
        }
        case "ArrowRight":
        case "d": {
            directions.push('d')
            break;
        }
        case "l": {
            init()
        }
        default:{
            return;
        }
    }
    event.preventDefault();
});

let Snake;
let FieldAv
let score = 0
let head;
let apple;
let next;


function init() {
    snake = [[7, 2,'d'], [7, 3,'d'], [7, 4,'d']]
    FieldAv = [];
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 17; x++) {
            FieldAv.push([y, x]);
            document.getElementById(y + ":" + x).setAttribute("style", "background-color: lime;");
        }
    }
    lastdir = 'd';

    directions = [];

    document.getElementById("7:2").setAttribute("style", "background-image: url(sprites/tail_d.png);");
    document.getElementById("7:3").setAttribute("style", "background-image: url(sprites/body_dd.png);");
    document.getElementById("7:4").setAttribute("style", "background-image: url(sprites/head_d.png);");

    
    FieldAv = FieldAv.filter(x => x[1] != 2 || x[0] != 7);
    FieldAv = FieldAv.filter(x => x[1] != 3 || x[0] != 7);
    FieldAv = FieldAv.filter(x => x[1] != 4 || x[0] != 7);
    
    document.getElementById("7:12").setAttribute("style", "background-image: url(sprites/apple.png);");
    if (apple != null) {
        document.getElementById(apple[0] + ":" + apple[1]).innerHTML = " ";
    }

    head = [7, 4];
    apple = [7, 12];
    score = 0;

    document.getElementById("score").innerHTML = score.toString();

    if (id != null)
        window.clearInterval(id);
    id = window.setInterval(play, 300);
}




function play() {

    if (directions.length == 0) {
        directions.push(lastdir)
    }

    switch (directions[0]) {
        case 'w':
            {
                if (head[0] == 0) {
                    alert("YOU LOST   SCORE: " + score);
                    init();
                    return;
                }
                if (lastdir != 's') {
                    next = [head[0] - 1, head[1]];
                }
                else {
                    next = [head[0] + 1, head[1]];
                    directions[0] = lastdir;
                }
                break;
            }
        case 'd':
            {
                if (head[1] == width) {
                    alert("YOU LOST   SCORE: " + score);
                    init();
                    return;
                }
                if (lastdir != 'a') {
                    next = [head[0], head[1] + 1];
                }
                else {
                    next = [head[0], head[1] - 1];
                    directions[0] = lastdir;
                }
                break;
            }
        case 's':
            {
                if (head[0] == height) {
                    alert("YOU LOST   SCORE: " + score);
                    init();
                    return;
                }
                if (lastdir != 'w') {
                    next = [head[0] + 1, head[1]];
                }
                else {
                    next = [head[0] - 1, head[1]];
                    directions[0] = lastdir;
                }
                break;
            }
        case 'a':
            {
                if (head[1] == 0) {
                    alert("YOU LOST   SCORE: " + score);
                    init();
                    return;
                }
                if (lastdir != 'd') {
                    next = [head[0], head[1] - 1];
                }
                else {
                    next = [head[0], head[1] + 1];
                    directions[0] = lastdir;
                }
                break;
            }

    }
    document.getElementById(head[0] + ":" + head[1]).setAttribute("style", "background-image: url(sprites/body_"+lastdir+directions[0]+".png);");

    lastdir = directions[0];
    directions.shift()

    if (snake.some(x => x[0] == next[0] && x[1] == next[1])) {
        alert("YOU LOST   SCORE: " + score);
        init();
        return;
    }
    snake.push([next[0],next[1],lastdir]);

    document.getElementById(next[0] + ":" + next[1]).setAttribute("style", "background-image: url(sprites/head_"+lastdir+".png);");


    FieldAv = FieldAv.filter(x => x[1] != next[1] || x[0] != next[0]);

    head = next;

    if (apple[0] == next[0] && apple[1] == next[1]) {
        score++;
        document.getElementById(apple[0] + ":" + apple[1]).innerHTML = " ";

        document.getElementById("score").innerHTML = score.toString();
        let co = FieldAv[Math.floor(Math.random() * (FieldAv.length))];
        document.getElementById(co[0] + ":" + co[1]).setAttribute("style", "background-image: url(sprites/apple.png);");
        apple = co;
        if (score == 15) {
            window.clearInterval(id);
            id = window.setInterval(play, 235);
        }
        else if (score == 25) {
            window.clearInterval(id);
            id = window.setInterval(play, 175);
        }
        else if (score == 32) {
            window.clearInterval(id);
            id = window.setInterval(play, 120);
        }
        else if (score == 45) {
            window.clearInterval(id);
            id = window.setInterval(play, 75);
        }
    }
    else {
        document.getElementById(snake[1][0] + ":" + snake[1][1]).setAttribute("style", "background-image: url(sprites/tail_"+snake[2][2]+".png);");
        let l = snake[0];
        document.getElementById(l[0] + ":" + l[1]).setAttribute("style", "background-image: none;");
        FieldAv.push(snake.shift());
    }
}

init()
