const EventEmitter = require('events');

class PostiInput extends EventEmitter {
  constructor () {
    super();
    this.element = document.createElement('div');
    this.element.classList.add('postInput');

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/posti';
    form.encoding = 'multipart/form-data';
    this.textinput = document.createElement('textarea');
    this.textinput.name = 'content';
    this.textinput.placeholder = 'Schreibe hier deinen Beitrag mit maximal 1024 Zeichen';
    this.textinput.maxLength = '1024';
    this.textinput.input = 'required';
    form.appendChild(this.textinput);

    const Inputlabel = document.createElement('label');
    Inputlabel.textContent = 'Hier JPEG oder GEOJSON hochladen';
    Inputlabel.id = 'inputLabel';
    form.appendChild(Inputlabel);

    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.name = 'input_file';
    this.fileInput.setAttribute('accept', '.jpg, application/JSON');
    form.appendChild(this.fileInput);

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Beitrag hinzufügen';
    button.id = 'addBeitrag';
    form.appendChild(button);
    this.element.appendChild(form);
  }

  getElement () {
    return this.element;
  }

  // redundant
  show () {
    this.input.value = '';
    this.input.focus();

    this.element.style.display = 'flex';
  }

  // redundant
  hide () {
    this.element.style.display = 'none';
  }
}

module.exports = PostiInput;
