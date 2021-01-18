const PostiInput = require('./PostiInput');
const Pagination = require('./Pagination');

const postiInput = new PostiInput();
const pagination = new Pagination();

document.body.appendChild(postiInput.getElement());
document.body.appendChild(pagination.getElement());

/* global fetch */

fetch('/data').then(response => {
  if (response.ok) {
    return response.json();
  }
}).then(body => {
  pagination.setData(body);
  pagination.fillDatainSide();
}).catch(err => {
  console.log('ERROR READING DATA' + err);
});
