import "./style.css";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

let marker = L.marker([0, 0]);
const map = L.map("map").setView([45.4613, 9.1595], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function inserisciDati(lat, lon, tipo) {
  const data = {
    punto: {
      lon: lon,
      lat: lat,
    },
    tipo: tipo,
  };
  const record = await pb.collection("compito").create(data);
  console.log("Dati aggiunti");
}

async function aggiornaMarker() {
  const records = await pb.collection("compito").getFullList();

  records.forEach(record => {
    const lat = record.punto.lat;
    const lon = record.punto.lon;
    const tipo = record.tipo;

    const m = L.marker([lat, lon]).addTo(map);
    m.bindPopup(tipo);
  });

}

aggiornaMarker();

function onMapClick(e) {
  var marker = L.marker(e.latlng).addTo(map);
  let x = e.latlng.lat;
  let y = e.latlng.lng;
  let coordinate = { lon: x, lat: y };

  console.log(coordinate);

  const tipo = Inserisci();
  // salvo la roba

  function Inserisci() {
    var tipo = null;
    while (
      tipo != "incidente" &&
      tipo != "incendio" &&
      tipo != "allagamento" &&
      tipo != "lavori"
    ) {
      tipo = prompt(
        "Inserisci il tipo di evento (incidente/incendio/allagamento/lavori):"
      );
      if (
        tipo != "incidente" &&
        tipo != "incendio" &&
        tipo != "allagamento" &&
        tipo != "lavori"
      ) {
        alert(
          "Tipo non valido! Deve essere: incidente, incendio, allagamento, lavori"
        );
      }
    }
    marker.bindPopup(tipo).openPopup();

    return tipo;
  }

  // aggiungi all'array locale
  inserisciDati(x, y, tipo);
}

map.on("click", onMapClick);
