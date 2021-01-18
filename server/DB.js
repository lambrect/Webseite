exports.getAll = function () {
  return require('./blogentries.json');
};

exports.addContribution = function (content, filePath, fileType) {
  // create object to be inserted
  var obj = {
    text: content,
    time: Date.now(),
    file: filePath,
    type: fileType
  };
  // fetch json to insert into
  var fs = require('fs');
  var jsonfile = this.getAll();
  jsonfile.unshift(obj); // insert at first index
  fs.writeFile('./server/blogentries.json', JSON.stringify(jsonfile), function (err) {
    console.log(err);
  });
};
