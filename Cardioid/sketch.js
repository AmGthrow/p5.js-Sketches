var r;
var angle;
var step;
var x;
var y;
var trace;
var graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(width, height);
  graphics.clear();
  background(200);
  r = height * 0.2;
  x = 0;
  y = -height * 0.17
  var trace = true;
  angle = PI / 2;
  step = TWO_PI / 200;
}

function draw() {


  background(200);

  

  if (trace) {


    // ellipse(width/2+x, height/2+y, 2 * r);
    graphics.noFill();
    // graphics.clear();
    graphics.stroke(map(angle, -3*PI/2, PI/2, 0, 255),0,0);
    graphics.ellipse(width / 2 + r * cos(angle), height / 2 - r * sin(angle) + y, 2 * dist(r * cos(angle), -r * sin(angle), r * (cos(PI / 2)), -r * sin(PI / 2)));
    image(graphics, 0, 0);



  } else {
    // background(200);
    stroke(180);
    ellipse(width /2 + x, height / 2 + y, 2 * r);
    stroke(0);
    line(width / 2 + r * cos(angle), height / 2 - r * sin(angle) + y, width / 2 + r * (cos(PI / 2)), height / 2 - r * sin(PI / 2)+y);
    stroke(map(angle, -3*PI/2, PI/2, 0, 255),0,0);
    ellipse(width / 2 + r * cos(angle), height / 2 - r * sin(angle) + y, 2 * dist(r * cos(angle), -r * sin(angle), r * (cos(PI / 2)), -r * sin(PI / 2)));
  stroke(0);
  }

    fill(255);
  ellipse(width / 2 + r * (cos(angle)), height / 2 - r * sin(angle) + y, 8);
  ellipse(width / 2 + r * (cos(PI / 2)), height / 2 - r * sin(PI / 2) + y, 8);
  noFill();




  angle -= step;
  if (angle <= -3 * Math.PI / 2) {
    angle = Math.PI / 2;
    background(200);
    graphics.clear();
    trace = !trace;
  }
}