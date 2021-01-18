const EventEmitter = require('events');

class Posti extends EventEmitter {
  constructor (data, type, counter, resources) {
    super();

    this.element = document.createElement('div');
    this.element.classList.add('posti');
    if (type === 'image/jpeg') {
      const img = document.createElement('img');
      img.classList.add('img');
      img.src = data.file;
      this.element.appendChild(img);
    } else if (type === 'application/json') {
      const geo = document.createElement('div');
      geo.style.height = '30rem';
      geo.id = 'mapid' + counter;
      this.element.appendChild(geo);
    }
    const timestamp = document.createElement('p');
    timestamp.classList.add('timestamp');
    var d = new Date(data.time);
    var datestring = ('0' + d.getDate()).slice(-2) + '.' + ('0' + d.getMonth()).slice(-2) + '.' + d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    timestamp.textContent = '' + datestring + ' Uhr';

    const postitext = document.createElement('p');
    postitext.innerHTML = data.text;

    this.element.appendChild(timestamp);
    this.element.appendChild(postitext);
  }

  getElement () {
    return this.element;
  }

  getUrl () {
    return this.url;
  }
}

module.exports = Posti;
