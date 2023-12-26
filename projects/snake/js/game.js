import vars from "./vars.js";

vars.food = createFood()
let lastRenderTime = 0
let gameOverShown = false // for enabling Enter key event listener
vars.ctx = vars.$canvas.getContext('2d')
vars.$canvas.width = vars.$canvas.offsetWidth
vars.$canvas.height = vars.$canvas.offsetHeight

function setCanvasSize() {
    vars.$canvas.width = window.innerWidth
    vars.$canvas.height = window.innerHeight
}

function drawSnake() {
    vars.ctx.clearRect(0, 0, vars.$canvas.width, vars.$canvas.height)
    vars.ctx.fillStyle = 'white' // Use a bright color for visibility
    vars.snake.forEach(segment => {
        vars.ctx.fillRect(segment.x, segment.y, vars.SNAKE_SIZE, vars.SNAKE_SIZE)
    });
}

function moveSnake() {
    const head = vars.snake[0]
    for (let i = vars.snake.length - 1; i > 0; i--) {
        vars.snake[i].x = vars.snake[i - 1].x
        vars.snake[i].y = vars.snake[i - 1].y
    }
    vars.snake[0].x += vars.directionX
    vars.snake[0].y += vars.directionY
    if (head.x === vars.food.x && head.y === vars.food.y) {
        vars.food = createFood() // Create new food
        vars.score += 100 // Increase score
        vars.snake.push({}) // Add new segment to the snake
    }
}

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / vars.SNAKE_SPEED) return

    lastRenderTime = currentTime;
    if (checkCollision()) {
        showGameOverScreen()
        return
    }
    moveSnake()
    drawSnake()
    drawFood()
    updateScoreDisplay()
}

function checkCollision() {
    const head = vars.snake[0]
    // if head reaches -x, -y or beyond width and height, game over 
    if (head.x < 0 || head.x + vars.SNAKE_SIZE > vars.$canvas.width + 5 ||
        head.y < 0 || head.y + vars.SNAKE_SIZE > vars.$canvas.height) {
        return true;
    }
    for (let i = 1; i < vars.snake.length; i++) {
        if (head.x === vars.snake[i].x && head.y === vars.snake[i].y) {
            return true
        }
    }
    return false
}

function handleKeyPress(e) {
    // basic snake movement controls
    switch(e.key) {
        case 'ArrowUp':
            if (vars.directionY !== vars.SNAKE_SIZE) {
                vars.directionX = 0
                vars.directionY = -vars.SNAKE_SIZE
            }
            break;
        case 'ArrowDown':
            if (vars.directionY !== -vars.SNAKE_SIZE) {
                vars.directionX = 0
                vars.directionY = vars.SNAKE_SIZE
            }
            break;
        case 'ArrowLeft':
            if (vars.directionX !== vars.SNAKE_SIZE) {
                vars.directionX = -vars.SNAKE_SIZE
                vars.directionY = 0
            }
            break;
        case 'ArrowRight':
            if (vars.directionX !== -vars.SNAKE_SIZE) {
                vars.directionX = vars.SNAKE_SIZE
                vars.directionY = 0
            }
            break;
    }
}

function createFood() {
    let foodX, foodY
    // create random x, y coordinates for food
    while (true) {
        foodX = Math.floor(Math.random() * (vars.$canvas.width / vars.SNAKE_SIZE)) * vars.SNAKE_SIZE
        foodY = Math.floor(Math.random() * (vars.$canvas.height / vars.SNAKE_SIZE)) * vars.SNAKE_SIZE
        
        let foodEaten = vars.snake.some(segment => {
            return segment.x === foodX && segment.y === foodY
        });
        if (foodEaten) {
            break
        }
        return {x: foodX, y: foodY}
    }
}

function drawFood() {
    vars.ctx.fillStyle = 'red'
    vars.ctx.fillRect(vars.food.x, vars.food.y, vars.SNAKE_SIZE, vars.SNAKE_SIZE)
}

function showGameOverScreen() {
    if (!gameOverShown) {
        gameOverShown = true // Set the flag to true to prevent further calls
        // Pause the game audio and set its source to the game over audio
        vars.$gameAudio.pause()
        vars.$gameAudio.src = 'assets/game-over.mp3'
        
        // Play the game over audio
        vars.$gameAudio.play()

        // Display the game over screen
        document.getElementById('gameOverScreen').style.display = 'flex'
        // enable Enter key event listener
        vars.isRestartMenuActive = true
    }
}

function updateScoreDisplay() {
    vars.$score.innerText = 'Final Score: ' + vars.score
    // increase speed every 1,000 points
    switch (vars.score) {
        case (1000):
            vars.score += 100
            vars.SNAKE_SPEED+=1
            console.log(vars.SNAKE_SPEED)
            break
        case (2000):
            vars.score += 100
            vars.SNAKE_SPEED+=2
            console.log(vars.SNAKE_SPEED)
            break
        case (3000):
            vars.score += 100
            vars.SNAKE_SPEED+=1
            break
        case (4000):
            vars.score += 100
            vars.SNAKE_SPEED+=2
            break
        case (5000):
            vars.score += 100
            vars.SNAKE_SPEED+=1
            break
    }
}

function restartGame() {
    vars.snake = [{ x: 400, y: 100 }] // Reset snake to initial position
    vars.score = 0 // Reset score
    vars.directionX = vars.SNAKE_SIZE // Initial horizontal movement
    vars.directionY = 0 // No vertical movement initially
    gameOverShown = false // Reset game over flag
    vars.isRestartMenuActive = false // for enter event listener flag
    vars.SNAKE_SPEED = 6 // reset snake speed
    
}

export {drawSnake, moveSnake, gameLoop, handleKeyPress, setCanvasSize, restartGame}

