let hearts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    let newHeart;
    let overlapping;
    
    // Ensure hearts start separated
    do {
      overlapping = false;
      newHeart = new Heart(random(width), random(height));
      
      for (let j = 0; j < hearts.length; j++) {
        let d = dist(newHeart.x, newHeart.y, hearts[j].x, hearts[j].y);
        if (d < (newHeart.size + hearts[j].size) * 1.2) { // Avoid overlap
          overlapping = true;
          break;
        }
      }
      
    } while (overlapping);
    
    hearts.push(newHeart);
  }
}

function draw() {
  background(10, 50);
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].moveMe();
    hearts[i].drawMe();
  }
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.color = color(random(200, 255), random(20, 50), random(100, 255));
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  moveMe() {
    let attraction = 0.0025;

    // Move towards mouse
    this.speedX += (mouseX - this.x) * attraction;
    this.speedY += (mouseY - this.y) * attraction;

    // Repulsion from other hearts (collision avoidance)
    for (let i = 0; i < hearts.length; i++) {
      if (hearts[i] !== this) {
        let d = dist(this.x, this.y, hearts[i].x, hearts[i].y);
        let minDist = (this.size + hearts[i].size) * 0.8;
        
        if (d < minDist && d > 0) {
          let repelForce = 0.05;
          let angle = atan2(this.y - hearts[i].y, this.x - hearts[i].x);
          
          this.speedX += cos(angle) * repelForce;
          this.speedY += sin(angle) * repelForce;
        }
      }
    }

    // Update position
    this.x += this.speedX * 0.5;
    this.y += this.speedY * 0.5;

    // Slow down over time
    this.speedX *= 0.9;
    this.speedY *= 0.9;

    // Keep inside canvas
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
      this.x = constrain(this.x, 0, width);
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
      this.y = constrain(this.y, 0, height);
    }
  }

  drawMe() {
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size, this.y - this.size, this.x - this.size * 1.5, this.y + this.size / 3, this.x, this.y + this.size);
    bezierVertex(this.x + this.size * 1.5, this.y + this.size / 3, this.x + this.size, this.y - this.size, this.x, this.y);
    endShape(CLOSE);
  }
}
