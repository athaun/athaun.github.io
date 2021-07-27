var chunkSize = 60;
var blockSize = 30;
var increment = 0.04;
var xIncrement = increment;
var yIncrement = increment;

let terrain = [];
for (var x = 0; x < chunkSize; x++) {
    terrain.push(new Array(chunkSize))
}
function setup() {
  colorMode(HSB);
  canvas = createCanvas(window.innerWidth, window.innerHeight, "webgl");
  canvas.parent("canvas-parent");
  smooth();
  background(0);
  createHeightMapValues();

  chunkSize = Math.floor(windowWidth/blockSize)
}




var yoff = 0
function createHeightMapValues () {
    for (var x = 0; x < chunkSize; x++) {
        var xoff = 0
        for (var y = 0; y < chunkSize; y++) {
            terrain[x][y] = map(simplex2(xoff, yoff), -1, 1, 0, 100)
            xoff += increment
        }
        yoff += increment
    }
}

function drawHeightMap () {

    noStroke();
    // stroke(0)
    rotateZ(frameCount * 0.001)
    push()
    translate(-(chunkSize*blockSize)/2, -(chunkSize*blockSize)/2);
    for (var x = 1; x < chunkSize - 1; x++) {
        beginShape(TRIANGLE_STRIP)
        for (var y = 1; y < chunkSize - 1; y++) {

            let top = 400
            let bottom = -400

            fill(getColor(x, y))
            vertex((x) * blockSize, y * blockSize, map(terrain[x][y], 0, 100, bottom, top))
            fill(getColor(x + 1, y))
            vertex((x+1) * blockSize, (y) * blockSize, map(terrain[x + 1][y], 0, 100, bottom, top))
            fill(getColor(x, y + 1))
            vertex((x) * blockSize, (y + 1) * blockSize, map(terrain[x][y + 1], 0, 100, bottom, top))
            fill(getColor(x + 1, y + 1))
            vertex((x+1) * blockSize, (y + 1) * blockSize, map(terrain[x + 1][y + 1], 0, 100, bottom, top))
            
        }
        endShape()
    }
    pop()
}

function getColor (x, y) {
    let c = lerpColor(
        color(217, map(terrain[x][y], 0, 100, 60, 80), 90), 
        color(281, map(terrain[x][y], 0, 100, 50, 70), 100), 
        terrain[x][y]/100);

    return c
}

function draw () {
    background(257, 35, 25)
    rotateX(-90)
    translate(0, -300, 0)
    drawHeightMap();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    chunkSize = Math.floor(windowWidth/blockSize)
    yoff = 0
    terrain = [];
    for (var x = 0; x < chunkSize; x++) {
        terrain.push(new Array(chunkSize))
    }
    console.log(terrain)
    createHeightMapValues()
}