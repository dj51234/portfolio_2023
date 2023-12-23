import vars from "./vars.js";

vars.$canvasStart.addEventListener('click', () => {
    setTimeout(() => {
        vars.$title.classList.remove('visible')
        setTimeout(() => {
            vars.$canvas.classList.add('visible')
        }, 500);
    }, 500);
})
