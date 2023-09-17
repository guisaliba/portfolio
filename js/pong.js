import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const player = new Paddle(document.getElementById('player-paddle'));
const computer = new Paddle(document.getElementById('computer-paddle'));

let lastTime;
let isGameOver = false;
let playerScore = 0;

function update(time) {
  if (isGameOver) {
    window.location.replace('portfolio.html');
    return;
  }

  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [player.rect(), computer.rect()]);
    computer.update(delta, ball.y);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScore++;
  }

  if (playerScore == 1) {
    isGameOver = true;
  }

  ball.reset();
  computer.reset();
}

document.addEventListener('mousemove', (e) => {
  player.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
