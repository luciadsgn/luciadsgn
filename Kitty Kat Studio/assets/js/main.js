var navbar = document.querySelector(".navbar");
window.onscroll = () => {
  this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
};

//Feed rss
function carregar() {
  var url = 'https://news.google.com/rss?hl=pt-PT&gl=PT&ceid=PT:pt-150';
  $.ajax({
    url:"https://api.rss2json.com/v1/api.json?rss_url=" + url,
    type: 'GET',
    success: function (data) {
      objeto_json = eval(data);
      var frase = "";
      var i=0;
      while(i<2){
      frase = frase + "Título: <b>" + objeto_json.items[i].title + "</b><br/>";
      frase = frase + objeto_json.items[i].description + "<br/>";
      i++;
      }
      $("#caixa").html(frase);
    },
    error: function (xhr, status) {
      alert('Ocorreu um erro.');
    }
  });
}

//Orçamento
function validation() {
  var typeOr = parseInt(document.getElementById("tipo").value);
  var prazo = parseInt(document.getElementById("prazo").value);
  var checkbox = document.getElementsByClassName("separadores");
  var sepLenght = 0;
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) sepLenght++;
  }
  var percentagem = 0;
  if (prazo >= 1 && prazo < 5) {
    percentagem = prazo * 5;
  } else if (prazo >= 5) {
    percentagem = 20;
  }
  var result = typeOr + sepLenght * 400;
  result = (result / 100) * percentagem + result;

  document.getElementById("total").value = result;
}

//Validar formulário
function validarNome() {
  var text = arguments[0].value;
  var letters = /^[A-Za-z]+$/;
  if (text == ''){
    alert("Por favor, preencha o campo.");
  } else if (!letters.test(text)){
    alert("Por favor, use apenas letras.");
  }
}

function validarApelido() {
  var text = arguments[0].value;
  var letters = /^[A-Za-z]+$/;
  if (text == ''){
    alert("Por favor, preencha o campo.");
  } else if (!letters.test(text)){
    alert("Por favor, use apenas letras.");
  }
}

function validarTelemovel() {
  var telemovel = document.formulario.telemovel.value;
  if (isNaN(telemovel)) {
    alert("O número inserido não está correto");
    return false;
  }
  if (telemovel.length != 9) {
    alert("O número de telemóvel deverá conter 9 dígitos.");
    return false;
  }
  if (!telemovel.startsWith(9)) {
    alert("Telemóvel não começa com 9.");
    return false;
  }
}

function validarEmail() {
  var email = document.formulario.email.value;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(email).toLowerCase())) {
    alert("Email inválido");
    return false;
  }
}

function validar() {
  alert("Obrigado pelo preenchimento do formulário. Todos os campos foram preenchidos corretamente.");
  return true;
}

// Mapa
var fixedLocation = L.latLng(38.73373593713473, -9.141247288354071);
var map = L.map('map').setView(fixedLocation, 13);

var marker = L.marker(fixedLocation).addTo(map);
marker.bindPopup("<b>Kitty Kat Studio</b>").openPopup();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function calculateRoute() {
  var destination = document.getElementById("destination").value;
  var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + destination;

  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    var lat = json[0].lat;
    var lon = json[0].lon;

    var routeUrl = 'https://www.openstreetmap.org/directions?engine=graphhopper_car&route=' +
      fixedLocation.lat + ',' + fixedLocation.lng +
      ';' + lat + ',' + lon;
      window.open(routeUrl, '_blank');
  });
}