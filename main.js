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
    speed: 10,
    traffic: 2
};

playGame();
function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

console.log(getQuantityElements(100));

function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = "";
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.backgroundImage = 'url("./image/enemy.png")';
        enemy.y = -150 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);        
    }
    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
    car.style.bottom = '10px';
    car.style.top = 'auto';
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    if (settings.start) {
        settings.score += settings.speed;
        score.textContent = 'Результат:' + settings.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }
        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed;
        }
        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }

        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function startRun() {
    console.log('start');
}

function stopRun() {
    console.log('stop');
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach((item) => {
        item.y += settings.speed;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -110;
        }
    });

}

function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((item) => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            settings.start = false;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
        }

        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys[e.key] = true;

});
document.addEventListener('keyup', (e) => {
    e.preventDefault();
    keys[e.key] = false;
});