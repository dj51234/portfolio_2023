import vars from "./vars.js";

vars.$volumeIcon.style.display = 'none';

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
    }, 500);

    // animate title div into page
    setTimeout(() => {
        vars.$title.style.visibility = 'visible'
        vars.$title.classList.add('visible')

        // animate snake letters
        let delay = 0;
        vars.$titleSpan.forEach(span => {
            setTimeout(() => {
                span.classList.add('typewriter') 
            }, delay);   
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

    }, 2500); 
})

vars.$volumeIcon.addEventListener('click', () => {
    vars.$gameAudio.muted = !vars.$gameAudio.muted;
    vars.$volumeIcon.textContent = vars.$gameAudio.muted ? '\u{1F507}' : '\u{1F50A}'; // Change icon based on mute state
});

