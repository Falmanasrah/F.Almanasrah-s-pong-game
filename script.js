const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddleHeight = 80;
let paddleWidth = 10;

let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 2;

let playerScore = 0;
let aiScore = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") {
    playerY -= 20;
  } else if (e.key === "s" || e.key === "ArrowDown") {
    playerY += 20;
  }
});

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 20) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "#FFF");
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 2;
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Top and bottom collision
  if (ballY <= 0 || ballY + 10 >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // AI paddle follow ball
  if (aiY + paddleHeight / 2 < ballY) {
    aiY += 2;
  } else {
    aiY -= 2;
  }

  // Player paddle collision
  if (
    ballX <= paddleWidth &&
    ballY + 10 >= playerY &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // AI paddle collision
  if (
    ballX + 10 >= canvas.width - paddleWidth &&
    ballY + 10 >= aiY &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Score update
  if (ballX < 0) {
    aiScore++;
    resetBall();
  } else if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }

  document.getElementById("score").innerText = `Player: ${playerScore} | AI: ${aiScore}`;
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "#222"); // background
  drawNet();
  drawRect(0, playerY, paddleWidth, paddleHeight, "#0f0");
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "#f00");
  drawBall(ballX, ballY, 10, "#fff");
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
