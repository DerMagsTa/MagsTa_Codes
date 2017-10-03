let headline1, headline2;
let karte1, karte2;
let content1, content2;
let lieder;
let lied;
let data;

function preload() {
  data = loadJSON("lieder.json");
}

function setup() {

  lieder = data["items"];
  lied = lieder.pop().track;
  headline1 = document.getElementById("1_Headline");
  headline1.innerHTML = lied.name;
  karte1 = document.getElementById("1_Karte");
  karte1.style.backgroundImage = "url('" + lied.album.images[1].url + "')";
  content1 = document.getElementById("1_Content");
  content1.innerHTML = lied.artists[0].name + '<br>' + lied.album.name;

  lied = lieder.pop().track;
  headline2 = document.getElementById("2_Headline");
  headline2.innerHTML = lied.name;
  karte2 = document.getElementById("2_Karte");
  karte2.style.backgroundImage = "url('" + lied.album.images[1].url + "')";
  content2 = document.getElementById("2_Content");
  content2.innerHTML = lied.artists[0].name + '<br>' + lied.album.name;
}


function auswahl(id) {

  if (lieder.length > 0) {
    lied = lieder.pop().track;
    if (id == 1) {
      headline2.innerHTML = lied.name;
      karte2.style.backgroundImage = "url('" + lied.album.images[1].url + "')";
      content2.innerHTML = lied.artists[0].name + '<br>' + lied.album.name;
    } else {
      headline1.innerHTML = lied.name;
      karte1.style.backgroundImage = "url('" + lied.album.images[1].url + "')";
      content1.innerHTML = lied.artists[0].name + '<br>' + lied.album.name;
    }
  } else {
    if (id == 1) {
      sieger(headline1.innerHTML);
    } else {
      sieger(headline2.innerHTML);
    }
  }
}

function sieger(text) {
  var snackbarContainer = document.querySelector('#winner-toast');
  var data = {message: "Dein Lieblingslied ist " + text};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
}
