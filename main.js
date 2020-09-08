const 
    score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const settings = {
    start: false,
    score: 0,
    speed: 3
};

function startGame() {
    start.classList.add('hide');
    settings.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
}

function playGame() {
    console.log('Play game!');
    if (settings.start) {
        requestAnimationFrame(playGame);           
    }
}

function startRun() {
    console.log('start');
}

function stopRun() {
    console.log('stop');
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys[e.key] = true;

} );
document.addEventListener('keyup', (e) => {
    e.preventDefault();
    keys[e.key] = false;
} );