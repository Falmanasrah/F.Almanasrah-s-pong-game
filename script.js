const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Paddle settings
const paddleWidth = 10, paddleHeight = 60;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 5;

// Ball settings (slower speed)
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;  // Slower horizontal speed
let ballSpeedY = 2;  // Slower vertical speed

// Scores
let score1 = 0;
let score2 = 0;

// Paddle movement states
let paddle1Up = false, paddle1Down = false, paddle2Up = false, paddle2Down = false;

// Draw paddles and ball
function drawPaddle(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

// Update ball position
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight || 
        ballX >= canvas.width - paddleWidth - ballSize && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds (left or right)
    if (ballX <= 0) {
        score2++;
        resetBall();
    } 
    if (ballX >= canvas.width) {
        score1++;
        resetBall();
    }
}

// Reset ball to center after scoring
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
}

// Move paddles based on keyboard input
function movePaddles() {
    // Left paddle controls (W and S keys)
    if (paddle1Up && paddle1Y > 0) paddle1Y -= paddleSpeed;
    if (paddle1Down && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;

    // Right paddle controls (ArrowUp and ArrowDown keys)
    if (paddle2Up && paddle2Y > 0) paddle2Y -= paddleSpeed;
    if (paddle2Down && paddle2Y < canvas.height - paddleHeight) paddle2Y += paddleSpeed;
}

// Draw the score at the top of the canvas
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(`Player 1: ${score1}   Player 2: ${score2}`, canvas.width / 2 - 100, 30);
}

// Draw your name below the canvas
function drawName() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('F.Almanasrah', canvas.width / 2 - 80, canvas.height - 20);
}

// Listen for keydown events
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') paddle1Up = true;
    if (event.key === 's') paddle1Down = true;
    if (event.key === 'ArrowUp') paddle2Up = true;
    if (event.key === 'ArrowDown') paddle2Down = true;
});

// Listen for keyup events to stop paddle movement
document.addEventListener('keyup', (event) => {
    if (event.key === 'w') paddle1Up = false;
    if (event.key === 's') paddle1Down = false;
    if (event.key === 'ArrowUp') paddle2Up = false;
    if (event.key === 'ArrowDown') paddle2Down = false;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, paddle1Y);  // Left paddle
    drawPaddle(canvas.width - paddleWidth, paddle2Y);  // Right paddle
    drawBall();
    drawScore();  // Display score
    drawName();  // Display name below the canvas
    moveBall();
    movePaddles();
    requestAnimationFrame(gameLoop);
}

gameLoop();
