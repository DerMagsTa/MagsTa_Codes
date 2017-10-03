const breite = 500;
let reihen = 25;
let schritt = breite / reihen;
let aktuelleReihe, aktuelleSpalte;
let auswahl, modus;
let wahrscheinlichkeit;

function setup() {
  let canvas = createCanvas(breite, breite);
  canvas.parent('programm-area');
  //Dropdown zur Auswahl des Modus
  auswahl = createSelect();
  auswahl.parent('programm-actions');
  auswahl.addClass('mdl-radio__button');
  auswahl.option('Standard');
  auswahl.option('Verlauf');
  auswahl.option('Farbig');
  auswahl.option('Kästen');
  auswahl.option('VVVVV');
  auswahl.option("2-Farbig");
  auswahl.changed(auswahlChanged);

  wahrscheinlichkeit = createSlider(0.1, 0.99, 0.5, 0.01);
  wahrscheinlichkeit.parent("programm-actions");
  wahrscheinlichkeit.addClass("mdl-slider mdl-js-slider");

  background(0);
  colorMode("HSB");
  modus = "Standard";
  aktuelleReihe = 0;
  aktuelleSpalte = 0;
}

function draw() {
  switch (modus) {
    case "Standard":
      stroke(255);
      if (random(1) >= wahrscheinlichkeit.value()) {
        slash();
      } else {
        backslash();
      }
      weiter();
      break;
    case "Verlauf":
      stroke(255);
      strokeWeight(map(aktuelleReihe, 0, reihen, 1, 12));
      if (random(1) >= wahrscheinlichkeit.value()) {
        slash();
      } else {
        backslash();
      }
      weiter();
      break;
    case "Farbig":
      stroke(map(aktuelleReihe, 0, reihen, 1, 255), map(aktuelleSpalte, 0, reihen, 1, 255), 100);
      strokeWeight(2);
      if (random(1) >= wahrscheinlichkeit.value()) {
        slash();
      } else {
        backslash();
      }
      weiter();
      break;
    case "Kästen":
      noStroke();
      strokeWeight(2);
      if (random(1) >= wahrscheinlichkeit.value()) {
        fill(255);
      } else {
        fill(0);
      }
      rect(aktuelleSpalte * schritt, aktuelleReihe * schritt, schritt, schritt);
      weiter();
      break;
    case "VVVVV":
      stroke(255);
      strokeWeight(2);
      if (random(1) >= wahrscheinlichkeit.value()) {
        // V
        line(aktuelleSpalte * schritt, aktuelleReihe * schritt, (aktuelleSpalte + 0.5) * schritt, (aktuelleReihe + 1) * schritt);
        line((aktuelleSpalte + 0.5) * schritt, (aktuelleReihe + 1) * schritt, (aktuelleSpalte + 1) * schritt, aktuelleReihe * schritt);
      } else {
        // A
        line(aktuelleSpalte * schritt, (aktuelleReihe + 1) * schritt, (aktuelleSpalte + 0.5) * schritt, aktuelleReihe * schritt);
        line((aktuelleSpalte + 0.5) * schritt, aktuelleReihe * schritt, (aktuelleSpalte + 1) * schritt, (aktuelleReihe + 1) * schritt);

      }
      weiter();
      break;
    case "2-Farbig":
    strokeWeight(4);
    if (random(1) >= wahrscheinlichkeit.value()) {
      stroke("green");
    } else {
      stroke("orange");
    }
    if (random(1) >= wahrscheinlichkeit.value()) {
      slash();
    } else {
      backslash();
    }
    weiter();
    break;
      break;
  }


}

function auswahlChanged() {
  //Nachdem die Auwahl geändert wurde, modus aktualisieren und
  //Zeichenbereich zurücksetzen.
  modus = auswahl.value();
  background(0);
  aktuelleReihe = 0;
  aktuelleSpalte = 0;
}

function slash() {
  // zeichnet /
  line((aktuelleSpalte + 1) * schritt, aktuelleReihe * schritt, aktuelleSpalte * schritt, (aktuelleReihe + 1) * schritt);
}

function backslash() {
  // zeichnet \
  line(aktuelleSpalte * schritt, aktuelleReihe * schritt, (aktuelleSpalte + 1) * schritt, (aktuelleReihe + 1) * schritt);
}

function weiter() {
  //Positionen erhöhen, um nächsten Strich zu zeichnen
  aktuelleSpalte++;
  if (aktuelleSpalte > reihen) {
    aktuelleSpalte = 0;
    aktuelleReihe++;
    if (aktuelleReihe > reihen) {
      background(0);
      aktuelleReihe = 0;
    }
  }
}
