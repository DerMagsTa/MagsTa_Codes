const breite = 800;
let farbe;
let auswahl, modus;

function setup() {
  let canvas = createCanvas(breite, breite);
  canvas.parent('programm-area');
  //Dropdown zur Auswahl des Modus
  auswahl = createSelect();
  auswahl.parent('programm-actions');
  auswahl.addClass('mdl-radio__button');
  auswahl.option('Kreis');
  auswahl.option('Kreis random');
  auswahl.option('Farbig');
  auswahl.option('Kästen');
  auswahl.option('VVVVV');
  auswahl.option("2-Farbig");
  auswahl.changed(auswahlChanged);

  farbe = createSlider(0, 255, 120, 5);
  farbe.parent("programm-actions");
  farbe.addClass("mdl-slider mdl-js-slider");
  farbe.changed(auswahlChanged);

  background(51);
  colorMode(HSL);
  modus = "Kreis random";
  noLoop();
}

function draw() {
  background(51);
  switch (modus) {
    case "Kreis":
      strokeWeight(2);
      noFill();
      kreis(width / 2, height / 2, 400, 100);
      break;
    case "Kreis random":
      strokeWeight(2);
      noFill();
      kreisRandom(width / 2, height / 2, 400, 100);
      break;
    case "Farbig":

      break;
    case "Kästen":

      break;
    case "VVVVV":

      break;
    case "2-Farbig":

      break;
  }
}

function auswahlChanged() {
  //Nachdem die Auwahl geändert wurde, modus aktualisieren und
  //Zeichenbereich zurücksetzen.
  modus = auswahl.value();
  draw();
}

function kreis(x, y, d, b) {
  if (d > 5) {
    stroke(farbe.value(), 100, b);
    ellipse(x, y, d);
    kreis(x - d / 1.5, y, d / 1.5, b * 0.6);
    kreis(x + d / 1.5, y, d / 1.5, b * 0.6);
    kreis(x, y - d / 1.5, d / 1.5, b * 0.8);
    kreis(x, y + d / 1.5, d / 1.5, b * 0.8);
  }
}

function kreisRandom(x, y, d, b) {
  if (d > 5) {
    var faktor = random(0.5, 0.9);
    stroke(farbe.value(), 100, b);
    ellipse(x, y, d);
    //kreisRandom(x - d * faktor, y, d * faktor, b * 0.6);
    //kreisRandom(x + d * faktor, y, d * faktor, b * 0.6);
    kreisRandom(x, y - d * faktor, d * faktor, b * 0.8);
    kreisRandom(x, y + d * faktor, d * faktor, b * 0.8);
  }
}
