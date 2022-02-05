var images = [];
let color = "g";
let appleCol = "r";
let colorbg = "lime";

let Snake;
let FieldAv
let score = 0
let head;
let apple;
let next;

let paused = false;
let opensettings = false;
const height = 14;
const width = 16;

let visInd = 0;
let visArr = ["hidden", "visible"];
let directions = [];
let lastdir = 'd';

let id = null;
let wasPaused = false;

function OnSubmitName() {
    person = document.getElementById("name").value;
    //person=document.forms["settings"]["name"].value;
    if (person != null && person != "") {
        color = "g";
        var expiration_date = new Date();
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        document.cookie = "name=" + person + "; path=/Snake; expires=" + expiration_date.toUTCString();
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "cgi-bin/highscore.py?name=" + person.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt") + "&score=" + score, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                // Response
                var response = JSON.parse(this.responseText);
                document.getElementById("highscore").innerHTML = response.scores.join("<br>").replace(/,/g, ": ");
                var best = response.best[0];
                document.getElementById("personal_best").innerHTML = "Your best: " + best + "<br>Your place: " + response.best[1];
                let ht = "<option value=\"green\">green</option>";
                let ap = "<option value=\"red\">red</option>"
                if (best >= 25) {
                    document.getElementById("background").innerHTML = "<option value=\"lime\">lime</option><option value=\"blue\">blue</option><option value=\"dirt\">dirt</option><option value=\"desert\">desert</option><option value=\"black\">black</option><option value=\"white\">white</option>";
                    if (best >= 36) {
                        ht += "<option value=\"blue\">blue</option>"
                        ap += "<option value=\"blue\">blue</option>"
                        if (best >= 45) {
                            ap += "<option value=\"gold\">gold</option>"
                            if (best >= 50) {
                                ht += "<option value=\"red\">red</option>"
                                if (best >= 55) {
                                    ap += "<option value=\"black\">black</option>"
                                    if (best >= 60) {
                                        ap += "<option value=\"pink\">pink</option>"
                                        if (best >= 65) {
                                            ht += "<option value=\"pink\">pink</option>"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    document.getElementById("background").innerHTML = "<option value=\"lime\">lime</option>";
                }
                document.getElementById("type").innerHTML = ht;
                document.getElementById("apple").innerHTML = ap;

            }
        };
        xhttp.send();
    }
}

function preload() {
    document.getElementById("settings").style.visibility = "hidden";
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
    person = document.cookie.split(";").filter(x => x.startsWith("name="))[0].split("=")[1]
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "cgi-bin/highscore.py?name=" + person.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt") + "&score=" + 0, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = JSON.parse(this.responseText);
            document.getElementById("highscore").innerHTML = response.scores.join("<br>").replace(/,/g, ": ");
            if (person != "" && person != null && person != "Player")
                document.getElementById("personal_best").innerHTML = "Your best: " + response.best[0] + "<br>Your place: " + response.best[1];

        }
    };
    xhttp.send();
    if (!document.cookie.match(/^(.*;)?\s*name\s*=\s*[^;]+(.*)?$/)) {
        document.cookie = "name=Player";
    }
    document.getElementById("name").value = document.cookie.split(";").filter(x => x.startsWith("name="))[0].split("=")[1]
    OnSubmitName();

}


// preload images to avoid lag while playin
preload(
    "sprites/r_apple.png",
    "sprites/b_apple.png",
    "sprites/g_apple.png",
    //green
    "sprites/g_head_w.png",
    "sprites/g_head_a.png",
    "sprites/g_head_s.png",
    "sprites/g_head_d.png",
    "sprites/g_tail_w.png",
    "sprites/g_tail_a.png",
    "sprites/g_tail_s.png",
    "sprites/g_tail_d.png",
    "sprites/g_body_ww.png",
    "sprites/g_body_aa.png",
    "sprites/g_body_ss.png",
    "sprites/g_body_wa.png",
    "sprites/g_body_wd.png",
    "sprites/g_body_aw.png",
    "sprites/g_body_as.png",
    "sprites/g_body_sa.png",
    "sprites/g_body_sd.png",
    "sprites/g_body_dw.png",
    "sprites/g_body_ds.png",
    //blue
    "sprites/b_head_w.png",
    "sprites/b_head_a.png",
    "sprites/b_head_s.png",
    "sprites/b_head_d.png",
    "sprites/b_tail_w.png",
    "sprites/b_tail_a.png",
    "sprites/b_tail_s.png",
    "sprites/b_tail_d.png",
    "sprites/b_body_ww.png",
    "sprites/b_body_aa.png",
    "sprites/b_body_ss.png",
    "sprites/b_body_wa.png",
    "sprites/b_body_wd.png",
    "sprites/b_body_aw.png",
    "sprites/b_body_as.png",
    "sprites/b_body_sa.png",
    "sprites/b_body_sd.png",
    "sprites/b_body_dw.png",
    "sprites/b_body_ds.png",
    //red
    "sprites/r_head_w.png",
    "sprites/r_head_a.png",
    "sprites/r_head_s.png",
    "sprites/r_head_d.png",
    "sprites/r_tail_w.png",
    "sprites/r_tail_a.png",
    "sprites/r_tail_s.png",
    "sprites/r_tail_d.png",
    "sprites/r_body_ww.png",
    "sprites/r_body_aa.png",
    "sprites/r_body_ss.png",
    "sprites/r_body_wa.png",
    "sprites/r_body_wd.png",
    "sprites/r_body_aw.png",
    "sprites/r_body_as.png",
    "sprites/r_body_sa.png",
    "sprites/r_body_sd.png",
    "sprites/r_body_dw.png",
    "sprites/r_body_ds.png"

)



document.addEventListener('keydown', function (event) {
    if (opensettings || (paused && !"Pp+".includes(event.key)))
        return;
    switch (event.key) {
        case "P":
        case "p": {
            paused = !paused;
            document.getElementById("gameboard").style.visibility = visArr[visInd];
            visInd = 1 - visInd;
            break;
        }
        case "ArrowUp":
        case "W":
        case "w": {
            directions.push('w')
            break;
        }
        case "ArrowLeft":
        case "A":
        case "a": {
            directions.push('a')
            break;
        }
        case "ArrowDown":
        case "S":
        case "s": {
            directions.push('s')
            break;
        }
        case "ArrowRight":
        case "D":
        case "d": {
            directions.push('d')
            break;
        }
        case "L":
        case "l": {
            init()
            break;
        }
        case "+": {
            OnOpenedSettings();
            break;
        }
        default: {
            return;
        }
    }
    event.preventDefault();
});






function death() {
    let person = prompt("YOU LOST SCORE: " + score + "\nPlease enter your name:", document.cookie.split(";").filter(x => x.startsWith("name="))[0].split("=")[1]);
    if (person != null && person != "") {
        document.getElementById("name").value = person;
        var expiration_date = new Date();
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        document.cookie = "name=" + person + "; path=/Snake; expires=" + expiration_date.toUTCString();
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "cgi-bin/highscore.py?name=" + person.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt") + "&score=" + score, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                // Response
                var response = JSON.parse(this.responseText);
                document.getElementById("highscore").innerHTML = response.scores.join("<br>").replace(/,/g, ": ");
                document.getElementById("personal_best").innerHTML = "Your best: " + response.best[0] + "<br>Your place: " + response.best[1];

            }
        };
        xhttp.send();
    }
    init();
}


function init() {
    snake = [[7, 2, 'd'], [7, 3, 'd'], [7, 4, 'd']]
    FieldAv = [];
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 17; x++) {
            FieldAv.push([y, x]);
            document.getElementById(y+":"+x).style.background=colorbg;
            //document.getElementById(y+":"+x).style.backgroundImage="none";
        }
    }

    lastdir = 'd';
    paused = false;
    directions = [];


    document.getElementById("7:2").style.background= (colorbg+" url(sprites/" + color + "_tail_d.png) no-repeat center");
    document.getElementById("7:2").style.backgroundSize="cover";
    document.getElementById("7:3").style.background= (colorbg+" url(sprites/" + color + "_body_dd.png) no-repeat center");
    document.getElementById("7:3").style.backgroundSize="cover";
    document.getElementById("7:4").style.background= (colorbg+" url(sprites/" + color + "_head_d.png) no-repeat center");
    document.getElementById("7:4").style.backgroundSize="cover";


    FieldAv = FieldAv.filter(x => x[1] != 2 || x[0] != 7);
    FieldAv = FieldAv.filter(x => x[1] != 3 || x[0] != 7);
    FieldAv = FieldAv.filter(x => x[1] != 4 || x[0] != 7);

    document.getElementById("7:12").style.background= (colorbg+" url(sprites/" + appleCol + "_apple.png) no-repeat center");
    document.getElementById("7:12").style.backgroundSize="cover";

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

function OnOpenedSettings() {
    document.getElementById("gameboard").style.visibility = "hidden";
    document.getElementById("score").innerHTML = "";
    paused = true;
    opensettings = true;
    document.getElementById("settings").setAttribute("style", "visibility: visible;");
}

function OnClosedSettings() {
    OnSubmitApple();
    OnSubmitBackground();
    OnSubmitType();
    document.getElementById("gameboard").style.visibility = "visible";
    document.getElementById("score").innerHTML = score;
    paused = false;
    opensettings = false;
    document.getElementById("settings").setAttribute("style", "visibility: hidden;");
    visInd = 0;
}





function OnSubmitType() {
    switch (document.getElementById("type").value) {
        case "green": {
            color = "g"
            break;
        }
        case "blue": {
            color = "b"
            break;
        }
        case "red": {
            color = "r"
            break;
        }
        default: {
            return
        }
    }
}


function OnSubmitApple() {
    switch (document.getElementById("apple").value) {
        case "red": {
            appleCol = "r"
            break;
        }
        case "blue": {
            appleCol = "b"
            break;
        }
        case "gold": {
            appleCol = "g"
            break;
        }
        case "black": {
            appleCol = "d"
            break;
        }
        case "pink": {
            appleCol = "p"
            break;
        }
        default: {
            return
        }
    }
    document.getElementById(apple[0]+":"+apple[1]).style.background= (colorbg+" url(sprites/" + appleCol + "_apple.png) no-repeat center");
    document.getElementById(apple[0]+":"+apple[1]).style.backgroundSize="cover";
}

function OnSubmitBackground() {
    switch (document.getElementById("background").value) {
        case "lime": {
            colorbg = "lime"
            break;
        }
        case "blue": {
            colorbg = "blue"
            break;
        }
        case "dirt": {
            colorbg = "brown"
            break;
        }
        case "desert": {
            colorbg = "sandybrown"
            break;
        }
        case "black": {
            colorbg = "black"
            break;
        }
        case "white": {
            colorbg = "white"
            break;
        }
        default: {
            return
        }
    }
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 17; x++) {
            document.getElementById(y + ":" + x).style.backgroundColor=colorbg;
        }
    } 
}


function play() {
    if (paused)
        return;

    if (directions.length == 0) {
        directions.push(lastdir)
    }

    switch (directions[0]) {
        case 'w':
            {
                if (head[0] == 0) {
                    death();
                    return;
                }
                if (lastdir != 's') {
                    next = [head[0] - 1, head[1]];
                }
                else {
                    if (head[0] == height) {
                        death();
                        return;
                    }
                    next = [head[0] + 1, head[1]];
                    directions[0] = lastdir;
                }
                break;
            }
        case 'd':
            {
                if (head[1] == width) {
                    death();
                    return;
                }
                if (lastdir != 'a') {
                    next = [head[0], head[1] + 1];
                }
                else {
                    if (head[1] == 0) {
                        death();
                        return;
                    }
                    next = [head[0], head[1] - 1];
                    directions[0] = lastdir;
                }
                break;
            }
        case 's':
            {
                if (head[0] == height) {
                    death();
                    return;
                }
                if (lastdir != 'w') {
                    next = [head[0] + 1, head[1]];
                }
                else {
                    if (head[0] == 0) {
                        death();
                        return;
                    }
                    next = [head[0] - 1, head[1]];
                    directions[0] = lastdir;
                }
                break;
            }
        case 'a':
            {
                if (head[1] == 0) {
                    death();
                    return;
                }
                if (lastdir != 'd') {
                    next = [head[0], head[1] - 1];
                }
                else {
                    if (head[1] == width) {
                        death();
                        return;
                    }
                    next = [head[0], head[1] + 1];
                    directions[0] = lastdir;
                }
                break;
            }

    }
    document.getElementById(head[0] + ":" + head[1]).style.background=(colorbg+" url(sprites/" + color + "_body_" + lastdir + directions[0] + ".png) no-repeat center");
    document.getElementById(head[0] + ":" + head[1]).style.backgroundSize="cover";
    lastdir = directions[0];
    directions.shift()

    if (snake.some(x => x[0] == next[0] && x[1] == next[1])) {
        death();
        return;
    }
    snake.push([next[0], next[1], lastdir]);

    document.getElementById(next[0] + ":" + next[1]).style.background=(colorbg+" url(sprites/" + color + "_head_" + lastdir + ".png) no-repeat center");
    document.getElementById(next[0] + ":" + next[1]).style.backgroundSize="cover";


    FieldAv = FieldAv.filter(x => x[1] != next[1] || x[0] != next[0]);

    head = next;

    if (apple[0] == next[0] && apple[1] == next[1]) {
        score++;
        document.getElementById(apple[0] + ":" + apple[1]).innerHTML = " ";

        document.getElementById("score").innerHTML = score.toString();
        let co = FieldAv[Math.floor(Math.random() * (FieldAv.length))];
        document.getElementById(co[0] + ":" + co[1]).style.background=(colorbg+" url(sprites/" + appleCol + "_apple.png) no-repeat center");
        document.getElementById(co[0] + ":" + co[1]).style.backgroundSize="cover";
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
        document.getElementById(snake[1][0] + ":" + snake[1][1]).style.background= (colorbg+" url(sprites/" + color + "_tail_" + snake[2][2] + ".png) no-repeat center");
        document.getElementById(snake[1][0] + ":" + snake[1][1]).style.backgroundSize="cover";

        let l = snake[0];
        document.getElementById(l[0] + ":" + l[1]).setAttribute("style", "background: "+colorbg+";");
        FieldAv.push(snake.shift());
    }
}

alert("Snake will start when closing this popup!\nThe speed of the game will increase over time.\nControl with WASD or arrow keys.\nYou can reload the game by presing L\nYou can pause by pressing P\nPress + to open the settings")
init()
