var canvas;
var slider, slider2;
var kreis;
var minGeschwindigkeit = 5;
var maxGeschwindigkeit = 15;
var anzahlKollisionen = 0;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent('programm-area');
  var p1 = createP('Mindest Geschwindigkeit: ');
  p1.parent("programm-actions");
  slider = createSlider(0, 15, 5, 1);
  slider.parent('programm-actions');
  slider.addClass("mdl-slider mdl-js-slider");
  var p2 = createP('Maximale Geschwindigkeit: ');
  p2.parent("programm-actions");
  slider2 = createSlider(0, 15, 5, 1);
  slider2.parent('programm-actions');
  slider2.addClass("mdl-slider mdl-js-slider");

  background(0);
  colorMode(HSB)
  kreis = {
    x: 21,
    y: 21,
    istDurchmesser: 40,
    sollDurchmesser: 40,
    richtung: createVector(1, random(minGeschwindigkeit, maxGeschwindigkeit)),
    farbe: color(255, 100, 100),
    wachstumsrate: 1
  };
}

function draw() {
  minGeschwindigkeit = slider.value();
  maxGeschwindigkeit = slider2.value();
  fill(kreis.farbe);
  ellipse(kreis.x, kreis.y, kreis.istDurchmesser, kreis.istDurchmesser);
  kollisionsabfrage();
  if (kreis.istDurchmesser < kreis.sollDurchmesser) {
    //wachsen
    kreis.istDurchmesser += kreis.wachstumsrate;
  } else if (kreis.istDurchmesser > kreis.sollDurchmesser) {
    //schrumpfen
    kreis.istDurchmesser -= kreis.wachstumsrate;
  }
  kreis.x += kreis.richtung.x;
  kreis.y += kreis.richtung.y;
  if (anzahlKollisionen >= 50) {
    background(0);
    anzahlKollisionen = 0;
  }
}

function kollisionsabfrage() {
  //OBEN
  if (kreis.y - kreis.istDurchmesser / 2 <= 0) {
    kreis.richtung.y = random(minGeschwindigkeit, maxGeschwindigkeit);
    kollisionsAenderungen();
  }
  //RECHTS
  if (kreis.x + kreis.istDurchmesser / 2 >= width) {
    kreis.richtung.x = random(-minGeschwindigkeit, -maxGeschwindigkeit);
    kollisionsAenderungen();
  }
  //UNTEN
  if (kreis.y + kreis.istDurchmesser / 2 >= height) {
    kreis.richtung.y = random(-minGeschwindigkeit, -maxGeschwindigkeit);
    kollisionsAenderungen();
  }
  //LINKS
  if (kreis.x - kreis.istDurchmesser / 2 <= 0) {
    kreis.richtung.x = random(minGeschwindigkeit, maxGeschwindigkeit);
    kollisionsAenderungen();
  }
}

function kollisionsAenderungen() {
  anzahlKollisionen++;
  kreis.farbe = color(random(0, 255), 100, 100);
  kreis.sollDurchmesser = int(random(10, 90));
}
