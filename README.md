# Mappa Eventi con Leaflet e PocketBase

Questo progetto mostra una mappa interattiva basata su Leaflet che permette di:

Visualizzare eventi salvati su PocketBase

Aggiungere nuovi eventi cliccando sulla mappa

Salvare le coordinate (latitudine e longitudine) e il tipo di evento

Visualizzare ogni evento con un marker e un popup descrittivo

## Tecnologie utilizzate

-JavaScript

-Leaflet.js (mappe)

-PocketBase (backend / database)

-OpenStreetMap (tile della mappa)

-CSS (stili)

## Requisiti

Node.js installato

PocketBase avviato in locale

Un browser moderno

## Avvio del progetto
 Avvia PocketBase

Assicurarsi che PocketBase sia in esecuzione su:

http://127.0.0.1:8090

## Collezione PocketBase

Crea una collezione chiamata compito con i seguenti campi:

Nome campo	Tipo
punto	JSON
tipo	Text

Struttura del campo punto:

{
  "lat": number,
  "lon": number
}

## Funzionamento
## Visualizzazione eventi

All’avvio:

Vengono letti tutti i record dalla collezione compito

Ogni evento viene mostrato come marker sulla mappa

Il popup del marker mostra il tipo di evento

## Inserimento di un evento

Cliccando sulla mappa viene aggiunto un marker

Viene richiesto il tipo di evento tramite prompt

Tipi validi:

incidente

incendio

allagamento

lavori

I dati vengono salvati su PocketBase

## Logica principale
Inserimento dati
inserisciDati(lat, lon, tipo);

## Lettura dati
pb.collection("compito").getFullList();

Evento click sulla mappa
map.on("click", onMapClick);

## Posizione iniziale mappa

La mappa è centrata inizialmente su Milano:

L.map("map").setView([45.4613, 9.1595], 13);

 Note

I tipi di evento sono case-sensitive

Non è presente autenticazione

I marker vengono ricaricati ad ogni refresh della pagina



Progetto realizzato per esercitazione didattica su:
mappe interattive + database backend
