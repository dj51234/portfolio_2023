import vars from "./vars.js";
import { gameLoop, handleKeyPress, setCanvasSize, restartGame } from "./game.js";

window.onload = setCanvasSize

vars.$volumeIcon.style.display = 'none';

function startGameFromMainMenu() {
    vars.$canvasStart.click(); // Programmatically trigger the click event
    vars.isMainMenuActive = false
}

function startGameFromGameOver() {
    vars.$restartButton.click(); // Programmatically trigger the click event
    vars.isRestartMenuActive = false
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && vars.isMainMenuActive) { // Assuming isMainMenuActive is a flag in vars.js
        startGameFromMainMenu();
    }
    if (event.key === 'Enter' && vars.isRestartMenuActive) { // Assuming isMainMenuActive is a flag in vars.js
        startGameFromGameOver();
    }
});


// start game
vars.$playSnakeText.addEventListener('mouseenter', () => {
    vars.$playSnakeText.classList.remove('play-text-animation')
})

vars.$playSnakeText.addEventListener('mouseleave', () => {
    vars.$playSnakeText.classList.add('play-text-animation')
})

vars.$playSnakeText.addEventListener('click', () => {
    vars.$playGame.paused ? vars.$playGame.play() : vars.$playGame.currentTime = 0
    vars.$volumeIcon.style.display = 'block'
    
    // remove play button
    vars.$playDiv.style.opacity = 0
    setTimeout(() => {
        vars.$playDiv.style.visibility = 'hidden' 
    }, 500)

    // animate title div into page
    setTimeout(() => {
        vars.$title.style.visibility = 'visible'
        vars.$title.classList.add('visible')

        // animate snake letters
        let delay = 0;
        vars.$titleSpan.forEach(span => {
            setTimeout(() => {
                span.classList.add('typewriter') 
            }, delay)
            delay += 500
        })

        // animate credits
        setTimeout(() => {
            vars.$credits.classList.add('typewriter')
        }, delay + 500)

         // animate credits
         setTimeout(() => {
            vars.$mainMenu.classList.add('visible')
            vars.$startCanvas.classList.add('visible')
        }, delay + 500)
        vars.isMainMenuActive = true
    }, 2500); 
})

vars.$volumeIcon.addEventListener('click', () => {
    vars.$gameAudio.muted = !vars.$gameAudio.muted;
    vars.$volumeIcon.textContent = vars.$gameAudio.muted ? '\u{1F507}' : '\u{1F50A}'; // Change icon based on mute state
});

vars.$canvasStart.addEventListener('click', () => {
    setTimeout(() => {
        vars.$title.classList.remove('visible')
        setTimeout(() => {
            vars.$canvas.classList.add('visible')
        }, 500)
    }, 500);
    vars.$gameAudio.src = 'assets/snake-audio.mp3'
    setTimeout(() => {
        vars.$gameAudio.play()
        vars.ctx = vars.$canvas.getContext('2d')
        document.addEventListener('keydown', handleKeyPress)
        requestAnimationFrame(gameLoop)
        vars.$body.style.background = 'linear-gradient(0, #000, #000, #000, #000)'
    }, 1300);
})

vars.$restartButton.addEventListener('click', () => {
    restartGame()
    document.getElementById('gameOverScreen').style.display = 'none'
    vars.$canvas.classList.add('visible')
    requestAnimationFrame(gameLoop)
    vars.$gameAudio.pause();
    vars.$gameAudio.src = 'assets/snake-audio.mp3'
    
    // Play the game over audio
    vars.$gameAudio.play()

})




