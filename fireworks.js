let fireworks=[];
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);
  for (let i = 0; i < 5; i++) {
    let x=random(width);
     let y=random(height);
     for (let i = 0; i < 20; i++) {
   fireworks.push(new Firework(x,y));
}
  }
}


function draw() {
  background(0, 40);
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].display();
    fireworks[i].explosion();
  }
   if (frameCount % 40 === 0) {
     let x=random(width);
     let y=random(height);
     for (let i = 0; i < 20; i++) {
    fireworks.push(new Firework(x,y));
     
}
}
}

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    let speed = random(1, 5);
    let angle = random(0, TWO_PI);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    
    this.color=color(random(255),random(255),random(255));
    this.opacity=255;
  }

  display() {
    noStroke();
    fill(random(255),random(255),random(255),this.opacity);
    ellipse(this.x, this.y, 5);
  }

  explosion() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    this.opacity+=-1.5; // particles stay on screen for a bit and then fade out
  }
    
}