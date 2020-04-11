var pendulums = [],
  traces = [];
var bg = 0;
var numP = 7;
var colors;
var rand = 1;

function Line(x, y) {

  this.x = x;
  this.y = y;
  this.history = [createVector(this.x, this.y)];
  this.history.push(createVector(this.x, this.y));
  this.update = function(x, y) {


    this.x = x;
    this.y = y;
    this.history.push(createVector(this.x, this.y));
    if (this.history.length > 100) this.history.shift();
  }


  this.show = function(col) {
    for (let i = 0; i < this.history.length - 1; i++) {
      // line(i.x, i.y, (i+1).x, (i+1).y);
      stroke(col);
      strokeWeight(3);
      line(this.history[i].x, this.history[i].y, this.history[i + 1].x, this.history[i + 1].y);
      stroke(0);
      strokeWeight(1);

    }
  }

  this.clear = function() {
    this.history = [];
  }

}

function Pendulum(x = 0) {
  this.a1 = PI / 1.9;
  this.a2 = PI / (rand + x);
  this.a1_v = 0;
  this.a2_v = 0;

  this.r1 = height * 0.3;
  this.r2 = this.r1;

  this.m1 = 30 / 2;
  this.m2 = (25.5 + x) / 2;

  this.x1 = this.r1 * sin(this.a1);
  this.y1 = this.r1 * cos(this.a1);

  this.x2 = this.x1 + this.r2 * sin(this.a2);
  this.y2 = this.y1 + this.r2 * cos(this.a2);



  this.update = function() {

    let num1 = -g * (2 * this.m1 + this.m2) * sin(this.a1);
    let num2 = -this.m2 * g * sin(this.a1 - 2 * this.a2);
    let num3 = -2 * sin(this.a1 - this.a2) * this.m2;
    let num4 = this.a2_v * this.a2_v * this.r2 + this.a1_v * this.a1_v * this.r1 * cos(this.a1 - this.a2);
    let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    this.a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * sin(this.a1 - this.a2);
    num2 = this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2);
    num3 = g * (this.m1 + this.m2) * cos(this.a1);
    num4 = this.a2_v * this.a2_v * this.r2 * this.m2 * cos(this.a1 - this.a2);
    den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    this.a2_a = (num1 * (num2 + num3 + num4)) / den;



    this.x1 = this.r1 * sin(this.a1);
    this.y1 = this.r1 * cos(this.a1);

    this.x2 = this.x1 + this.r2 * sin(this.a2);
    this.y2 = this.y1 + this.r2 * cos(this.a2);
    this.a1_v += this.a1_a;
    this.a2_v += this.a2_a;
    this.a1 += this.a1_v;
    this.a2 += this.a2_v;
    
    //in case of zoom zoom? needs a LOT of tweaking
    if (this.a1_v >= 0.3) this.a1_v *= 0.3;
    if (this.a2_v >= 0.3) this.a2_v *= 0.3;
    if (this.a1_v >= 0.5) this.a1_v = 0.3;
    if (this.a2_v >= 0.5) this.a2_v = 0.3;
  }



  this.show = function() {
    stroke(130);
    strokeWeight(2);
    line(0, 0, this.x1, this.y1);
    line(this.x1, this.y1, this.x2, this.y2);
    fill(200);
    noStroke();
    ellipse(this.x1, this.y1, this.m1);
    ellipse(this.x2, this.y2, this.m2);
  }
  this.clear = function() {
    this.a1 = PI / 1.9;
    this.a2 = PI / (rand + x);
    this.a1_v = 0;
    this.a2_v = 0;
  }
}

function setup() {
  colors = [color(255, 0, 0), color(255, 127, 0), color(255, 255, 0), color(0, 255, 0), color(0, 0, 255), color(75, 0, 130), color(143, 0, 255)];
  rand = random(1.5, 2.5);
  createCanvas(windowWidth, windowHeight);

  g = 1; //scaling g down just because "meters" is so big and screen is pretty smol


  for (let i = 0; i < numP; i++) {
    pendulums[i] = new Pendulum(i * 0.001);
    traces[i] = new Line(pendulums[i].x2, pendulums[i].y2);
  }


}

function draw() {

  background(bg);
  translate(width / 2, height * 0.3);
  fill(150);
  for (let i = 0; i < numP; i++) {
    pendulums[i].update();
    traces[i].update(pendulums[i].x2, pendulums[i].y2);


  }

  for (let i = 0; i < numP; i++)
    traces[i].show(colors[i]);
  for (let i = 0; i < numP; i++)
    pendulums[i].show();







}

function mousePressed() {
  clear();
  rand = random(1.5, 2.5);  
  for (let i = 0; i < numP; i++) {
    pendulums[i].clear();
    traces[i].clear();
  }
}