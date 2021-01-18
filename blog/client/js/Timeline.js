const EventEmitter = require('events');
const Posti = require('./Posti');
var L = require('leaflet');

class Timeline extends EventEmitter {
  constructor () {
    super();
    this.element = document.createElement('div');
    this.element.classList.add('timeline');

    const title = document.createElement('h2');
    title.classList.add('title');
    this.element.appendChild(title);
  }

  getElement () {
    return this.element;
  }

  addContribution (Data) {
    let geoMapCounter = 0;
    let responseCounter = 0;
    for (let i = 0; i < Data.length; i++) {
      /* global fetch */
      if (Data[i].type === 'application/json') {
        geoMapCounter++;
        fetch(`/${Data[i].file}`).then(function (response) {
          return response.json();
        }).then(function (data) {
          responseCounter++;
          var mapid = 'mapid' + responseCounter;
          var geomap = L.map(mapid).setView(new L.LatLng(40.737, -73.923), 8);
          L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PuqNsELpaQJP8bvtozwO', {
            attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
            maxZoom: 25,
            minZoom: 4
          }).addTo(geomap);
          var geojson = L.geoJSON(data).addTo(geomap);
          geomap.flyTo(geojson.getBounds().getCenter(), 10);
          // fitbounds
          geomap.fitBounds(geojson.getBounds());
        });
      }
      const posti = new Posti(Data[i], Data[i].type, geoMapCounter);
      this.element.appendChild(posti.getElement());
    }
  }
}

module.exports = Timeline;
