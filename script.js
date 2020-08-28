let message = prompt('Masukan nama anda untuk memulai');

// DOM to canvas
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load imges & audio files
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();
let fly = new Audio();
let scor = new Audio();
let gameOver = new Audio();

bird.src = "./images/bird.png";
bg.src = "./images/bg.png";
fg.src = "./images/fg.png";
pipeUp.src = "./images/pipeUp.png";
pipeDown.src = "./images/pipeDown.png";
fly.src = "./sounds/fly.mp3";
scor.src = "./sounds/score.mp3";
gameOver.src = "./sounds/gameOver.mp3";

// some variable
let gap = 110;
let constant = 0;
let bX = 10;
let bY = 300;
let gravity = 2;
let score = 0;

// on key up or click
document.addEventListener("click", moveUp);
document.addEventListener("keyup", moveUp);

function moveUp() {
  bY -= 30;
  fly.play();
}

// pipe coordinates
let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = pipeUp.height + gap;
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;
    gravity = 2;

    if (pipe[i].x === -75) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
      });
    }

    // detect collision
    if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeUp.width && (bY <= pipe[i].y + pipeUp.height || bY + bird.height >= pipe[i].y + constant)) {
      gameOver.play();
      location.reload();
      return alert(`Skor terakhir kamu ${message} adalah : ${score}`);
    }
    if (bY + bird.height >= cvs.height - fg.height) {
      gravity = 0;
      gap--;
    }

    
    if (pipe[i].x === 5) {
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