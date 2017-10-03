var x;
var y;

function setup() {

  createCanvas(500, 500);
  colorMode(HSB);
  var x = int(width / 2);
  var y = height;

  background(0, 0, 0);
  stroke(255, 255, 100);
  translate(x, y);
  verzweigen(150);
}


function draw() {



}

function verzweigen(laenge) {
  if (laenge > 5) {
    stroke(random(0, 255), 100, 100);
    line(0, 0, 0, -laenge);
    translate(0,-laenge);
    push();
    rotate(PI / 5);
    verzweigen(laenge * 0.7);
    pop();
    push();
    rotate(-PI / 5);
    verzweigen(laenge * 0.7);
    pop();
  }
}
