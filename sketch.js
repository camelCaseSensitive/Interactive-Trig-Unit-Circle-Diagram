let w = 600;
let h = 500;

let p = {
  x: 100, y: 0, clicked: false, r: 0, th: 0
}

let s = 2;

let ts = 0.75;

let dark = false;

let dx = 0;
let dy = 0;

let mousePrev = {
  x: 0, y: 0
}

function setup() {
  cnv = createCanvas(w, h);
  
  cnv.elt.addEventListener("contextmenu", (e) => e.preventDefault());
  resizeCanvas(windowWidth, windowHeight);
  p.x = min(width,height)/s/2;
  p.r = min(width,height)/s/2;
  mousePrev.x = mouseX;
  mousePrev.y = mouseY;
  textAlign(CENTER)
  // textSize(16)
}

function draw() {
  textSize(12 * ts)
  if(dark){
    background(40);
  } else {
    background(255);
  }
  
  translate(width/2 + dx, height/2 + dy)
  noFill()
  
  line(-width, 0, width, 0)
  line(0, -height, 0, height)
  
  if(!dark) strokeWeight(0.5)
  circle(0, 0, min(width,height)/s)
  
  if(p.clicked && mouseIsPressed){
    p.th = atan2(mouseY- (height/2 + dy), mouseX- (width/2 + dx))
    p.x = p.r * cos(p.th);
    p.y = p.r * sin(p.th);
  } else if(mouseIsPressed) {
    dx += mouseX - mousePrev.x;
    dy += mouseY - mousePrev.y;
  }
  
  if(dark){
    fill(255);
    stroke(255);
  } else {
    fill(0);
    stroke(0);
  }
  line(0, 0, p.x, p.y)
  
  push()
    noStroke()
    text("cos(θ)", p.x/2, 12*ts)  // x-axis
    // text("cos(θ)", p.x/2, p.y+12) // Raised

    text("sec(θ)", p.r / cos(p.th)/2, 22*ts)

    text("sin(θ)", p.x + Math.sign(p.x) * 20*ts, p.y/2)
    text("csc(θ)", -18*ts * Math.sign(p.x), p.r/sin(p.th)/2) 
    text("1",p.x/2, p.y/2 + Math.sign(p.y)*15 + 5)
  pop()
  
  
  // push()
  //   textSize(abs(p.y)/10)
  //   text("sin(θ)", p.x + Math.sign(p.x) * 20, p.y/2)
  // pop()
  
  
  
  
  // Raised cosine line
  // line(p.x, p.y, 0, p.y)
  
  line(p.x, 0, p.x, p.y)
  
  line(p.x, p.y, p.r/cos(p.th), 0)
  line(p.x, p.y, 0, p.r/sin(p.th))
  
  
  if(dist(mouseX, mouseY, p.x+(width/2 + dx), p.y+(height/2 + dy)) < 15 && !mouseIsPressed){
    push()
      noFill()
      strokeWeight(2)
      if(dark){
        // stroke(255,140,0)
        stroke(225)
      } else{
        // stroke(255,140,0)
        stroke(40)
      }
      circle(p.x, p.y, 8)
    pop()
  }
  
  push()
    if(p.clicked){
      // fill(255,140,0)
      // stroke(255,140,0)
      circle(p.x, p.y, 7)
    }
    circle(p.x, p.y, 5)
  pop()
  
  push()
    if(dark) {
      stroke(255)
    } else {
      stroke(0)
    }
    noFill()
    arc(0, 0,  100, 100, 2*PI + p.th, 2*PI)
    noStroke()
    if(dark) {
      fill(255)
    } else {
      fill(0)
    }
    if(p.y > 0){
      text("θ", 35 * cos(PI + p.th/2), 35 * sin(PI + p.th/2) + 5)
    } else {
      text("θ", 35 * cos(p.th/2), 35 * sin(p.th/2) + 5)
    }
    
  pop()
  
  // Right angle markers
  noFill()
  // rect(0, -10, 10, 10)
  
  if(p.x > 0){
    rect(p.x, p.y < 0 ? -10*abs(p.y)/p.r : 0, -10*abs(p.y)/p.r, 10*abs(p.y)/p.r)
  } else {
    rect(p.x, p.y < 0 ? -10*abs(p.y)/p.r : 0, 10*abs(p.y)/p.r, 10*abs(p.y)/p.r)
  }
  
  
  translate(p.x, p.y)
  rotate(p.th)
  if(p.x > 0){
    rect( -10*abs(p.y)/p.r, -10*abs(p.y)/p.r, 10*abs(p.y)/p.r, 10*abs(p.y)/p.r)
  } else {
    rect( -10*abs(p.y)/p.r, 0, 10*abs(p.y)/p.r, p.y < 0 ? 10*abs(p.y)/p.r: -10*abs(p.y)/p.r)
  }
  
  rotate(PI/2)
  // strokeWeight(0.75)
  if(dark){
    fill(255)
  } else {
    fill(0)
  }
  translate(-p.r * tan(p.th) / 2, -10*ts)
  push()
    noStroke()
    text("tan(θ)", 0, 0)
    translate(p.r * tan(p.th) / 2, 0)
    translate(p.r * 1/tan(p.th)/2, 0)
    text("cot(θ)", 0, 0)
  pop()
  
  mousePrev = {
    x: mouseX, y: mouseY
  }
  
}

function mousePressed() {
  if(dist(mouseX, mouseY, p.x+(width/2 + dx), p.y+(height/2 + dy)) < 15){
    p.clicked = true;
  }
}

function mouseReleased() {
  p.clicked = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  p.r = min(width,height)/s/2;
  p.x = p.r * cos(p.th);
  p.y = p.r * sin(p.th);
}

function mouseWheel(){
    s += event.delta/1250
    ts -= event.delta/1250
    p.r = min(width,height)/s/2;
    p.x = p.r * cos(p.th);
    p.y = p.r * sin(p.th);
}

function keyPressed() {
  if(keyCode == 68){
    dark = ! dark
  }
}
