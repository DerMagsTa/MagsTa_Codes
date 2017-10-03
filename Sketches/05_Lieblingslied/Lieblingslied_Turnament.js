//HTML DOM Variablen
let headline1, headline2;
let karte1, karte2;
let content1, content2;
let audio1, audio2;

//Puffer für JSON
let data;

//Array von Lieder, die noch bewertet werden müssen
let lieder = [];
//aktuelles Lied (links und rechts)
let lied1, lied2;
//Arrays von bereits bewerteten Liedern
let sieger = [];
let verlierer = [];

//Lädt die Lieder aus der Spotify API
function preload() {
  data = loadJSON("http://127.0.0.1:3000/Sketches/05_Lieblingslied/lieder.json");
}

//alles Initialisieren und Elemente laden
function setup() {
  //Lieder aus dem Puffer laden -> unnützen Quatsch abschneiden
  var i;
  for (i in data["items"]) {
    lieder.push(data["items"][i].track);
  }
  data = null;

  //greift sich die jeweiligen HTML-DOM Elemente um diese später verändern zu können
  headline1 = document.getElementById("1_Headline");
  karte1 = document.getElementById("1_Karte");
  content1 = document.getElementById("1_Content");
  audio1 = document.getElementById("1_Audio");
  audio1.volume = 0.01;

  headline2 = document.getElementById("2_Headline");
  karte2 = document.getElementById("2_Karte");
  content2 = document.getElementById("2_Content");
  audio2 = document.getElementById("2_Audio");
  audio2.volume = 0.01;

  //Initiale Befüllung der DOM-Elemente
  aktualisieren_1();
  aktualisieren_2();
}

//Wird beim Klick auf "Auswählen" aufgerufen - Parameter gibt an welches Lied ausgewählt wurde
function auswahl(id) {
  //Ausgewähltes Lied in Sieger stecken - das andere in Verlierer
  if (id == 1) {
    sieger.push(lied1);
    verlierer.push(lied2);
  } else {
    sieger.push(lied2);
    verlierer.push(lied1);
  }

  //Nach der Auswahl neue Lieder anzeigen (wenn noch welche da sind)
  if (lieder.length > 1) {
    aktualisieren_1();
    aktualisieren_2();
  } else {
    // ist kein Lied mehr in Lieder, steht die nächste Runde an
    nächsteRunde();
  }

}

//aktualisiert das linke Karten-Element
function aktualisieren_1() {
  //nächstes Lied wird angezeigt
  lied1 = lieder.pop();
  headline1.innerHTML = lied1.name;
  karte1.style.backgroundImage = "url('" + lied1.album.images[1].url + "')";
  content1.innerHTML = lied1.artists[0].name + '<br>' + lied1.album.name;
  //hier gibt es sogar ein Audio-Sample
  audio1.src = lied1.preview_url;
}

//aktualisiert das rechte Karten-Element
function aktualisieren_2() {
  lied2 = lieder.pop();
  headline2.innerHTML = lied2.name;
  karte2.style.backgroundImage = "url('" + lied2.album.images[1].url + "')";
  content2.innerHTML = lied2.artists[0].name + '<br>' + lied2.album.name;
  audio2.src = lied2.preview_url;
}

//Initialisiert die nächste Runde oder gibt den Gewinner aus
function nächsteRunde(text){
  if (sieger.length > 1) {
    //Für die Sieger geht es nun wieder von vorne los
    lieder = sieger;
    sieger = [];
    aktualisieren_1();
    aktualisieren_2();
    toast("Nächste Runde!");
  } else {
    //der übrig gebliebende Gewinner wird ausgegeben
    toast("Dein Lieblingslied ist " + sieger[0].name);
  }
}

//ein wilder Toast erscheint...
function toast(text) {
  var snackbarContainer = document.querySelector('#winner-toast');
  var data = {
    message: text
  };
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
