import vars from "./vars.js";

let lastRenderTime = 0;
vars.ctx = vars.$canvas.getContext('2d')
vars.$canvas.width = vars.$canvas.offsetWidth;
vars.$canvas.height = vars.$canvas.offsetHeight;

function setCanvasSize() {
    vars.$canvas.width = window.innerWidth;
    vars.$canvas.height = window.innerHeight;
}

function drawSnake() {
    vars.ctx.clearRect(0, 0, vars.$canvas.width, vars.$canvas.height)
    vars.ctx.fillStyle = 'white'; // Use a bright color for visibility
    vars.snake.forEach(segment => {
        vars.ctx.fillRect(segment.x, segment.y, vars.SNAKE_SIZE, vars.SNAKE_SIZE);
    });
}

function moveSnake() {
    for (let i = vars.snake.length - 1; i > 0; i--) {
        vars.snake[i].x = vars.snake[i - 1].x
        vars.snake[i].y = vars.snake[i - 1].y
    }
    vars.snake[0].x += vars.directionX
    vars.snake[0].y += vars.directionY
}

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / vars.SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    if (checkCollision()) {
        showGameOverScreen()
        return
    }
    moveSnake();
    drawSnake();
}

function checkCollision() {
    const head = vars.snake[0]
    if (head.x <= 0 || head.x + vars.directionX >= vars.$canvas.width || 
        head.y <= 0 || head.y + vars.directionY >= vars.$canvas.height) {
        return true;
    }
    for (let i = 1; i < vars.snake.length; i++) {
        if (head.x === vars.snake[i].x && head.y === vars.snake[i].y) {
            return true;
        }
    }
    return false
}

function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowUp':
            if (vars.directionY !== vars.SNAKE_SIZE) {
                vars.directionX = 0;
                vars.directionY = -vars.SNAKE_SIZE;
            }
            break;
        case 'ArrowDown':
            if (vars.directionY !== -vars.SNAKE_SIZE) {
                vars.directionX = 0;
                vars.directionY = vars.SNAKE_SIZE;
            }
            break;
        case 'ArrowLeft':
            if (vars.directionX !== vars.SNAKE_SIZE) {
                vars.directionX = -vars.SNAKE_SIZE;
                vars.directionY = 0;
            }
            break;
        case 'ArrowRight':
            if (vars.directionX !== -vars.SNAKE_SIZE) {
                vars.directionX = vars.SNAKE_SIZE;
                vars.directionY = 0;
            }
            break;
    }
}

function showGameOverScreen() {
    vars.$gameAudio.pause() 
    vars.$gameOverAudio.play()
    document.getElementById('gameOverScreen').style.display = 'flex'
}

export {drawSnake, moveSnake, gameLoop, handleKeyPress, setCanvasSize}

