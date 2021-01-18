const EventEmitter = require('events');
const Timeline = require('./Timeline');

class Pagination extends EventEmitter {
  constructor () {
    super();
    this.pointer = 1;
    this.lastDataObject = 1;
    this.element = document.createElement('div');
    this.element.classList.add('wholePage');

    this.timeline = new Timeline();
    this.element.appendChild(this.timeline.getElement());
    this.paginationBar = document.createElement('div');
    this.paginationBar.classList.add('paginationBar');
    this.paginationBar.id = 'pagination';
  }

  createPagination (datalength) {
    const prev = document.createElement('button');
    prev.innerHTML = '<';
    prev.classList.add('pagi');
    prev.classList.add('previous');
    prev.addEventListener('click', () => {
      window.scrollTo(0, 420);
      this.showprevious();
    });
    this.paginationBar.appendChild(prev);

    this.numberOfButtons = Math.ceil(datalength / 10);

    for (let i = 1; i <= this.numberOfButtons; i++) {
      const button = document.createElement('button');
      button.innerHTML = i;
      if (button.innerHTML === this.pointer) {
        button.style.background = 'green';
      }
      button.classList.add('pagi');
      button.id = 'button' + i;
      button.addEventListener('click', () => {
        window.scrollTo(0, 420);
        this.showClickedSide(button);
      });
      this.paginationBar.appendChild(button);
    }

    const next = document.createElement('button');
    next.innerHTML = '>';
    next.classList.add('pagi');
    next.classList.add('next');
    next.addEventListener('click', () => {
      window.scrollTo(0, 420);
      this.shownext();
    });
    this.paginationBar.appendChild(next);

    this.element.append(this.paginationBar);
  }

  showClickedSide (button) {
    this.clearPageContent();
    this.pointer = button.innerHTML;
    this.fillDatainSide();
  }

  clearPageContent () {
    this.element.childNodes[1].innerHTML = '';
    this.element.childNodes[0].innerHTML = '';
  }

  showprevious () {
    if (this.pointer > 1) {
      this.clearPageContent();
      this.pointer--;
      this.fillDatainSide();
    }
  }

  shownext () {
    if (this.pointer < this.numberOfButtons) {
      this.clearPageContent();
      this.pointer++;
      this.fillDatainSide();
    }
  }

  getElement () {
    return this.element;
  }

  fillDatainSide () {
    // showContentObjects
    let shownContentObjects = this.data;
    if (this.lastDataObject >= (this.pointer * 10)) {
      shownContentObjects = shownContentObjects.slice(((this.pointer - 1) * 10), (this.pointer * 10));
    } else {
      shownContentObjects = shownContentObjects.slice(((this.pointer - 1) * 10), this.lastDataObject);
    }
    // add the showContentObjects
    this.timeline.addContribution(shownContentObjects);
    this.createPagination(this.data.length);
  }

  setData (data) {
    data.sort((e1, e2) => Date.parse(e2.time) - Date.parse(e1.time));
    this.data = data;
    this.lastDataObject = data.length;
  }

  showPageContent (data) {
    this.fillDatainSide();
  }
}

module.exports = Pagination;
