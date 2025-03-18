let video;
let scaleFactor = 0; // Scale for pop-out effect
let growing = false; // Start pop-out only after typewriter
let yOffset = 0;     // Vertical bounce effect
let bounceSpeed = 0.07; // Speed of bouncing
let bounceHeight = 80;  // Amplitude of bouncing

let fullText = "Hello! You thought this was about me! Nahhh it's ";
let currentText = "";  // Gradually build the text
let typewriterSpeed = 100; // Typing speed in milliseconds
let index = 0;         // Tracks the text being typed
let typingDone = false; // Flag to trigger pop-out effect

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  // Start typewriter effect
  setInterval(() => {
    if (index < fullText.length) {
      currentText += fullText[index];
      index++;
    } else {
      typingDone = true; // Start pop-out effect
      growing = true;
    }
  }, typewriterSpeed);
}

function draw() {
  background(0);

  let centerX = width / 2;
  let centerY = height / 2 + yOffset;
  let popText = "ABOUT YOU!!";

  video.loadPixels();

  push();
  translate(width, 0);
  scale(-1, 1);

  let stepSize = 5;
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      let index = (x + y * width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let heatColor = getHeatColor(brightness);

      fill(heatColor);
      noStroke();
      rect(x, y, stepSize, stepSize);
    }
  }
  pop();

  // **Animate Scale for "ABOUT YOU!!" After Typing**
  if (growing) {
    scaleFactor += 0.07;
    if (scaleFactor >= 1) {
      scaleFactor = 1;
      growing = false;
    }
  }
  
  // **Bouncing Effect After Animation**
  if (typingDone && !growing) {
    yOffset = sin(frameCount * bounceSpeed) * bounceHeight;
  }

  // **Center Text**
  textSize(20);
  textAlign(CENTER, CENTER);
  text(currentText, centerX, centerY);

  // **Pop-Out Effect for "ABOUT YOU!!"**
  if (typingDone) {
    push();
    translate(centerX + textWidth(currentText) / 1.5, centerY);
    scale(scaleFactor);
    fill(255);
    textSize(20);
    text(popText, 0, 0);
    pop();
  }
}

// Function for Heatmap Effect
function getHeatColor(value) {
  let cold = color(0, 0, 255);
  let mid = color(0, 255, 0);
  let warm = color(255, 255, 0);
  let hot = color(255, 0, 0);

  if (value < 85) {
    return lerpColor(cold, mid, value / 85);
  } else if (value < 170) {
    return lerpColor(mid, warm, (value - 85) / 85);
  } else {
    return lerpColor(warm, hot, (value - 170) / 85);
  }
}
