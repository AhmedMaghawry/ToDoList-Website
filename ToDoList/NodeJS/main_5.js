var express = require('express');
var fs = require('fs');
var app = express();
app.get('/', function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream("./test.html").pipe(response);})
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
