const $title = document.querySelector('.title')
const $titleH1 = document.querySelector('.title h1');
const $titleSpan = document.querySelectorAll('.title h1 span')
const $credits = document.querySelector('.title p')
const $playDiv = document.querySelector('.start-game')
const $playSnakeText = document.querySelector('.start-game h1')
const $playGame = document.querySelector('#play')
const $snakeDiv = document.querySelector('.snake-segments')
const $snakeSegments = document.querySelectorAll('.snake-segment')
const $snakeSegment = document.querySelector('.snake-segment')
const $volumeIcon = document.getElementById('volumeIcon');
const $gameAudio = document.getElementById('play');

$volumeIcon.style.display = 'none';

// start game
$playSnakeText.addEventListener('mouseenter', () => {
    $playSnakeText.classList.remove('play-text-animation')
})

$playSnakeText.addEventListener('mouseleave', () => {
    $playSnakeText.classList.add('play-text-animation')
})

$playSnakeText.addEventListener('click', () => {
    $playGame.paused ? $playGame.play() : $playGame.currentTime = 0
    $volumeIcon.style.display = 'block'
    
    // remove play button
    $playDiv.style.opacity = 0
    setTimeout(() => {
        $playDiv.style.visibility = 'hidden' 
    }, 500);

    // animate title div into page
    setTimeout(() => {
        $title.style.visibility = 'visible'
        $title.classList.add('visible')

        // animate snake letters
        let delay = 0;
        $titleSpan.forEach(span => {
            setTimeout(() => {
                span.classList.add('typewriter') 
            }, delay);   
            delay += 500
        })

        // animate credits
        setTimeout(() => {
            $credits.classList.add('typewriter')
        }, delay + 500)

    }, 2500); 
})


$titleH1.addEventListener('mouseenter', () => {
    $title.classList.add('rotate');
});

$titleH1.addEventListener('mouseleave', () => {
    $title.classList.remove('rotate');
});

$volumeIcon.addEventListener('click', () => {
    $gameAudio.muted = !$gameAudio.muted;
    $volumeIcon.textContent = $gameAudio.muted ? '\u{1F507}' : '\u{1F50A}'; // Change icon based on mute state
});


