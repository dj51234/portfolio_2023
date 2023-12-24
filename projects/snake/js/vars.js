const SNAKE_SIZE = 25

const vars = {
    // MAIN MENU VARS //
    $body: document.querySelector('body'),
    $title:  document.querySelector('.title'),
    $titleH1:  document.querySelector('.title h1'),
    $titleSpan:  document.querySelectorAll('.title h1 span'),
    $credits:  document.querySelector('.title p'),
    $playDiv:  document.querySelector('.start-game'),
    $playSnakeText:  document.querySelector('.start-game h1'),
    $playGame:  document.querySelector('#play'),
    $volumeIcon:  document.querySelector('#volumeIcon'),
    $gameAudio:  document.querySelector('#play'),
    $mainMenu:  document.querySelector('.main-menu'),
    $startCanvas:  document.querySelector('.start-canvas'),
    $canvas:  document.querySelector('.game-canvas'),
    $canvasStart:  document.querySelector('.start-canvas'),
    $gameOverAudio: document.querySelector('#gameOverSound'),
    
    // GAME VARS //
    ctx: null,

    //snake vars
    snake: [
        { x: 400, y: 100 },
    ],
    SNAKE_SPEED: 5,
    SNAKE_SIZE: SNAKE_SIZE,
    directionX: SNAKE_SIZE,
    directionY: 0,

}

export default vars
