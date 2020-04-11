var pendulums = [];
var bg = 0;
var numP = 2;
var g = 0.98;
var rand;

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


  this.show = function() {
    for (let i = 0; i < this.history.length - 1; i++) {
      // line(i.x, i.y, (i+1).x, (i+1).y);
      stroke(map(i, 0, this.history.length, bg, 57), map(i, 0, this.history.length, bg, 200), map(i, 0, this.history.length, bg, 20));
      strokeWeight(3);
      line(this.history[i].x, this.history[i].y, this.history[i + 1].x, this.history[i + 1].y);
      stroke(0);
      strokeWeight(1);

    }
  }

  this.clear = function() {
    this.history.splice(0, this.history.length);

  }

}

function Pendulum(x = 0) {
  this.a1 = PI / 2;
  this.a2 = PI / (rand+x);
  this.a1_v = 0;
  this.a2_v = 0;

  this.r1 = height * 0.3;
  this.r2 = this.r1;

  this.m1 = (30) / 2;
  this.m2 = (25.5 + x) / 2;

  this.x1 = this.r1 * sin(this.a1);
  this.y1 = this.r1 * cos(this.a1);

  this.x2 = this.x1 + this.r2 * sin(this.a2);
  this.y2 = this.y1 + this.r2 * cos(this.a2);



  this.update = function() {

    var num1 = -g * (2 * this.m1 + this.m2) * sin(this.a1);
    var num2 = -this.m2 * g * sin(this.a1 - 2 * this.a2);
    var num3 = -2 * sin(this.a1 - this.a2) * this.m2;
    var num4 = this.a2_v * this.a2_v * this.r2 + this.a1_v * this.a1_v * this.r1 * cos(this.a1 - this.a2);
    var den1 = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    this.a1_a = (num1 + num2 + num3 * num4) / den1;

    num1 = 2 * sin(this.a1 - this.a2);
    num2 = this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2);
    num3 = g * (this.m1 + this.m2) * cos(this.a1);
    num4 = this.a2_v * this.a2_v * this.r2 * this.m2 * cos(this.a1 - this.a2);
    den1 = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    this.a2_a = (num1 * (num2 + num3 + num4)) / den1;

    //these lines simulate friction in case it starts going too fast (v=0.4)
    // if (this.a1_v >= 0.3) this.a1_v *= 0.99;
    // if (this.a2_v >= 0.3) this.a2_v *= 0.99;



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
    fill(255);
    noStroke();
    ellipse(this.x1, this.y1, this.m1);
    ellipse(this.x2, this.y2, this.m2);
  }
  this.clear = function() {
    this.a1 = PI / 2;
    this.a2 = PI / (rand+x);
    this.a1_v = 0;
    this.a2_v = 0;
  }
}

function setup() {
  rand = random(1.5, 2.5);
  createCanvas(windowWidth, windowHeight);



  for (let i = 0; i < 2; i++) {
    pendulums[i] = new Pendulum(i * 0.001);
  }
  trace = new Line(pendulums.x2, pendulums.y2);

}

function draw() {


  background(bg);
  translate(width / 2, height * 0.3);
  fill(150);
  for (let i = 0; i < numP; i++) {
    trace.update(pendulums[i].x2, pendulums[i].y2);
    trace.show();

    pendulums[i].update();

  }
  for (let i = 0; i < numP; i++) pendulums[i].show();





}

function mousePressed() {
  clear();
  rand = random(1.5, 2.5);
  trace.clear();
  for (let i = 0; i < numP; i++)
    pendulums[i].clear();
}