const SPEED = 0.0175;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue('--position')
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty('--position', value);
  }

  reset() {
    this.position = 50;
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
