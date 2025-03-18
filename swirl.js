var angle = 0;
var numofdrops=5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}


function draw() {
  background(20,10);
  

  translate(mouseX, mouseY);
  ellipse(0, 0, 20);
  for (var i=0; i<numofdrops; i++){
    var radius=50;
    var theta = angle + (360 / numofdrops) * i;
    var x = cos(theta) * radius;
    var y = sin(theta) * radius;
    
    noStroke();
    drawDrop(x,y, 30, theta)
  }
  
  angle++; 
}


function drawDrop(x, y, size, rotation) {
  push();
  translate(x, y);
  rotate(rotation);
   beginShape();
  vertex(0, -15);
  bezierVertex(-15, 0, -7, 20, 0, 20);
  bezierVertex(7, 20, 15, 0, 0, -15);
  endShape(CLOSE);
  
  pop();
}

