let counter=1;
function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);

  }
  function draw(){
   // background(220);
     let n = noise(counter);
    for(var x=0; x<width; x+=30){
      for(var y=10; y<height; y+=20){
            let r=map(x+y,counter+20,50,0,255); 
           let g =map(y,counter+40,50,0,255); 
          let b= map(counter,counter+40,50,0,255); 
      stroke(r*5,g*2,r/10);
      ellipse(x,y,n*30);
      rect(x,y,n*20,50);
    }
    counter+=0.002
    } 
  }