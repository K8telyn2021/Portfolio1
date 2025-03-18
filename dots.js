let dot=[];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i=0; i<70; i++){
  dot[i]= new Dot(random(width),random(height));
}
}

function draw() {
  background(10,30);
  for (var i=0; i<dot.length; i++){
    if (dot[i].size>0){
    dot[i].drawMe();
    dot[i].moveMe();
    dot[i].reappear();
    }
  }
}
function mousePressed(){
  for(var i=0; i<dot.length;i++){
    dot[i].popIt();
  }
}
class Dot{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.size=random(1,80);
    this.xdirection=0.009;
    this.ydirection=0.7;
    this.opacity=255;
  }
  drawMe(){
  let r=map(this.y,10,height,255,50);
  let g=map(this.y,0,height,255,60);
  let b=map(this.y,0,height,255,80);
 
  fill(r+b,g-b,b*r/2,this.opacity);
  stroke(r+b/2,b+g,b*r);
  ellipse(this.x,this.y,this.size);
  }
  moveMe(){ 
    this.x+=random(-0.5,0.5);
    this.y+=this.ydirection;
}
  reappear(){
    if (this.y> height+this.size){
      this.y=-30;
      this.x=random(width);
      this.opacity=255;
    }
  }
  popIt(){
    let d=dist(this.x,this.y,mouseX, mouseY);
    if(this.size/2>d){
      this.opacity=0;

    }
  }

}
