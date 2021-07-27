const noiseScale = 0.002; // a lower value will result in less convolutions
const highQuality = true; // true: render lines using an ellipse, false: render lines drawing indivudual pixels

const colorRanges = [
  217, 289, 29, 0, 0, 0
];

let flowField = [];
let angleMod = 0;
let currentColorSet = [];

function setup() {
  colorMode(HSB);
  canvas = createCanvas(window.innerWidth, window.innerHeight, "webgl");
  canvas.parent("canvas-parent");

  smooth();

  background(0, 0, 0);

 

  const maxLines = highQuality ? 6000 : 10000; // rendering ellipses is using more ressources, so we lower the paricles

  for (let i = 0; i < maxLines; i++) {
    flowField.push(new FlowLine(random(0, width), random(0, height), random(colorRanges)));
  }
}

function draw() {
  push();
  translate(-width / 2, -height / 2);
//   background(0)
  for (let i = 0; i < flowField.length; i++) {
    const line = flowField[i];

    if (line.isOutOfBounds()) {
      flowField.splice(i, 1);
      flowField.push(new FlowLine(random(0, width), random(0, height), random(colorRanges)));
      angleMod = map(noise(frameCount * 0.0001), 0, 1, -180, 180);
    } else {
      line.draw();
    }
  }
  pop();
}

function FlowLine(x, y, c) {
  this.alpha = 100;
  this.c = c

  this.initialize = function () {
    this.point = createVector(x, y);
    this.updateNoise();
    this.updateDirection();
    this.setColor();
  };

  this.draw = function () {
    noStroke();
    fill(this.color);
    ellipse(this.point.x, this.point.y, 2);

    this.updateDirection();
    this.updateNoise();
    this.alpha -= 0.5;
  };

  this.setColor = function () {
    this.color = color(
        this.c, 70, map(this.noise, 0, 1, 0, 100)
    );

    if (this.c == 0) {
        this.color = color(
            c, 0, 0
        );
    }
  };

  this.updateDirection = function () {
    this.direction = p5.Vector.fromAngle(
      radians(map(this.noise, 0, 1, 0, 360) + angleMod)
    );
    this.point.add(this.direction);
  };

  this.updateNoise = function () {
    this.noise = noise(this.point.x * noiseScale, this.point.y * noiseScale);
  };

  this.isOutOfBounds = function () {
    return (
      this.point.x < 0 ||
      this.point.y < 0 ||
      this.point.x > width ||
      this.point.y > height
    );
  };

  this.initialize();
}
