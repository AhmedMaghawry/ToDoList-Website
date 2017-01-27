var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/index.html', function (req, res)
{
  res.sendFile( __dirname + "/" + "index_4.html");
})
app.get('/process_get', function (req, res) {
// Prepare output in JSON format
   response = {
       first:req.query.first_name,
       last:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response)); })
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
 })
