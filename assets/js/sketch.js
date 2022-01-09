function setup() {
    createCanvas(windowWidth, windowHeight);
}

  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
  
function draw() {
    if (playGame) {
        background(0)
        fill(100, 100, 100)
        ellipse(mouseX, mouseY, 100, 100);
    }
}