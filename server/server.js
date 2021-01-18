const express = require('express');
const http = require('http');
const DB = require('./DB');
const server = express();
const formidable = require('formidable');
var fs = require('fs');

server.use(express.static('./blog/dist/'));
server.use(express.static('./server/resources/'));
let port = 8080;
if (process.argv[2] && process.argv[2] > 0) {
  port = process.argv[2];
}

server.get('/data', (request, response) => {
  response.json(DB.getAll());
});

server.post('/posti', (request, response) => {
  const form = formidable({ multiples: true });
  form.parse(request, (err, fields, files) => {
    if (err) {
      console.log('ERROR');
      return;
    }
    var acceptedTypes = ['image/jpeg', 'application/json', 'application/octet-stream'];
    if (!acceptedTypes.includes(files.input_file.type) || !fields.content) {
      response.writeHead(302, {
        Location: '/'
      });
      response.end();
      return;
    }
    if (files.input_file.name !== '') {
      if (fs.existsSync('./server/resources/' + files.input_file.name)) {
        files.input_file.name = Date.now() + files.input_file.name;
      }
      var filePath = './server/resources/' + files.input_file.name;
      fs.copyFile(files.input_file.path, filePath, (err) => {
        if (err) throw err;
      });
    }
    DB.addContribution(fields.content, files.input_file.name, files.input_file.type);
    response.writeHead(302, {
      Location: '/'
    }); response.end();
  });
});

http.createServer(server).listen(port, function () {
  console.log('Server is listening on port ' + port);
});
