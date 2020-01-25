// DOM to canvas

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load imges

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeDown.src = "images/pipeDown.png";

// some variable

var gap = 95;

var bX = 50;
var bY = 150;

var gravity = 1.7;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key up

document.addEventListener("keyup", moveUp);

function moveUp() {
  bY -= 37;
  fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (i = 0; i < pipe.length; i++) {
    constant = pipeUp.height + gap;
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 120) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    // detect collision

    if ((bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeUp.width && (bY <= pipe[i].y + pipeUp.height || bY + bird.height >= pipe[i].y + constant)) || bY + bird.height >= cvs.height - fg.height) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 35) {
      score++;
      scor.play();
    }
  }
  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);



  bY += gravity;

  ctx.fillStyle = "black";
  ctx.font = "25px Verdana";
  ctx.fillText("Score : " + score, 20, cvs.height - 20);

  requestAnimationFrame(draw);
}

draw();