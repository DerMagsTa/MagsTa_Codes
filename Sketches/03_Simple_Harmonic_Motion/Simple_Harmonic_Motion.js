var slideSin, slideCos;
var stepX, stepY;
var amplitudeX, amplitudeY;
var x, y;
var s, c;
const phasendifferenz = 0.25;

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent('programm-area');

  var p1 = createP('Sinus-Rate: ');
  p1.parent("programm-actions");
  slideSin = createSlider(0, 0.5, 0.02, 0.01);
  slideSin.parent('programm-actions');
  slideSin.addClass("mdl-slider mdl-js-slider");

  var p2 = createP('Cosinus-Rate: ');
  p2.parent("programm-actions");
  slideCos = createSlider(0, 0.5, 0.04, 0.01);
  slideCos.parent('programm-actions');
  slideCos.addClass("mdl-slider mdl-js-slider");

  background(0);

  amplitudeX = width * 0.9 / 2;
  amplitudeY = height * 0.9 / 2;

  stepX = 0;
  stepY = 0;


}

function draw() {
  translate(width / 2, height / 2);
  background(0, 10);
  noStroke();
  fill(255,50);

  s = sin(stepX + phasendifferenz);
  c = sin(stepY);

  x = amplitudeX * s;
  y = amplitudeY * c;

  ellipse(x, y, 40, 40);

  stepX = stepX + slideSin.value();
  stepY = stepY + slideCos.value();
}
