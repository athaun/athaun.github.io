function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2)
    background(0)

    createHeightMapValues();
    smooth();
}

var chunkSize = 1000;
var blockSize = 5;

var increment = 0.02;
var xIncrement = increment;
var yIncrement = increment;

var terrain = Array.apply(0, Array(chunkSize)).map(function () {
    return Array.apply(0, Array(chunkSize));
});

var yoff = 0; // Y offset for noise (this is the y value passed into the noise function)
var createHeightMapValues = function () {
    // these loops fill the terrain array with a perlin noise map, that creates integer height values between 0 and 100
    for (var x = 0; x < chunkSize; x++) {
        var xoff = 0; // X value passed into noise function
        for (var y = 0; y < chunkSize; y++) {
            // take the value that noise() outputs (which is between 0 and 1), and remap it to a value between 0 and 100... 
            // then put that value into the terrain array at the X and Y position (note that these are not the X and Y offset used to calculate the terrain height)
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, 100);
            xoff += increment; // increase the x noise input by a small increment to get th next noise value
        }
        yoff += increment;
    }
};


// Define the levels that each terrain type is above
var levels = {
    deepWater: 54,
    shallowWater: 51,
    sand: 48.5,
    lightGrass: 42,
    darkGrass: 0
};

var drawHeightMap = function () {
    fill(0);
    noStroke();
    for (var x = 0; x < chunkSize; x++) {
        for (var y = 0; y < chunkSize; y++) {
            var neighbors = [false, false, false, false];
            // Now, looping through the terrain array, set the color of the terrain based on the height stored at the current index
            if (terrain[x][y] >= levels.deepWater) {
                fill(35, 81, 128);  // deep water
            } else if (terrain[x][y] >= levels.shallowWater) {
                fill(37, 91, 148);  // shallow water
            } else if (terrain[x][y] >= levels.sand) {
                fill(199, 174, 46); // sand
            } else if (terrain[x][y] >= levels.lightGrass) {
                fill(31, 97, 9);    // light green grass
            } else if (terrain[x][y] >= levels.darkGrass) {
                fill(34, 77, 19);   // dark green grass
            }
            rect(x * blockSize, y * blockSize, 40, 40);
        }
    }
};



function draw() {
    if (displayMainContent) {
        drawHeightMap();
    }
}