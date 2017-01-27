var express = require('express');
var app = express();
//app.use(express.bodyParser());
var fs = require("fs");
var bodyParser = require('body-parser');
var path    = require("path");
var count = 0;
app.use(express.static(__dirname + '/public'));
//app.get('/viewdirectory', require('./all.js'))
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var authenticatedUser = null;
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/Login.html'));
})
app.post('/login', urlencodedParser, function (req, res) {
// Prepare output in JSON format
  username = req.body.username;
  password = req.body.password;
  console.log(username);
  console.log(password);
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var flag = 0;
    for (var user in data) {
      if(username == data[user].email && password == data[user].password){flag = 1; authenticatedUser = user; break;}
      else{flag = 0;  }
    }
    if(flag == 1){
      if (count == 0) {
      res.sendFile(path.join(__dirname+'/index.html'));
      count++;
    }
      fs.readFile( __dirname + "/" + "tables.json", 'utf8', function (err1, tables_data) {
        tables_data = JSON.parse(tables_data);
        //console.log(tables_data[user].html);
        res.end((tables_data[user].html));
      });
    }
    else{res.sendFile(path.join(__dirname+'/Login2.html'));}
  });
 })
app.post('/opregst', urlencodedParser, function (req, res) {
// Prepare output in JSON format
    res.sendFile(path.join(__dirname+'/regest.html'));
 })
app.post('/addUser', urlencodedParser, function (req, res) {
// First read existing users.
var email = req.body.InputEmail;
var email2 = req.body.InputEmail2;
var name = req.body.InputName;
var pass = req.body.InputPass;
var pass2 = req.body.InputPass2;
fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
     var flag = 20;
       for (var user in data) {
      if(email == data[user].email){flag = 0; authenticatedUser = user; break;}
      else{flag = 1;  }
    }
    console.log(flag);
if (email == email2 && pass == pass2 && flag == 1){
var html = "";
var user1 ={name:name, password:pass, email:email};
var user2 ={name:name, html:html};
fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
    data[email+""] = user1;
       //console.log( data );
       res.end( JSON.stringify(data));
       fs.writeFile(__dirname + "/" + "users.json",JSON.stringify(data), function (err) {
          if (err) return console.log(err);
          //console.log(JSON.stringify(data));
        });
});
fs.readFile( __dirname + "/" + "tables.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data[email+""] = user2;
      // console.log( data );
       res.end( JSON.stringify(data));
       fs.writeFile(__dirname + "/" + "tables.json",JSON.stringify(data), function (err) {
          if (err) return console.log(err);
         // console.log(JSON.stringify(data));
        });
});
  }
  else {
    res.sendFile(path.join(__dirname+'/regest.html'));
  }
       });
res.sendFile( path.join(__dirname+'/login.html'));
 })
app.post('/array', function(req, res) {
     var data = req.body;
    //console.log(data);
    //arrays = data;
    fs.writeFile(__dirname + "/user" + id +  ".json",JSON.stringify(data), function (err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(data));
    });
      res.send('success');
});
 app.post('/save', urlencodedParser, function (req, res) {
 // Prepare output in JSON format
   body = req.body.dummy;
   //console.log("This is the body /n");
   console.log(body);
   console.log(authenticatedUser);
   fs.readFile( __dirname + "/" + "tables.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
     data[authenticatedUser].html = "<html>" + body + "</html>";
     fs.writeFile(__dirname + "/" + "tables.json",JSON.stringify(data), function (err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(data));
      });
    //console.log(authenticatedUser);
    res.setHeader('X-XSS-Protection', 0);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data[authenticatedUser].html);
  });
   res.sendFile( path.join(__dirname+'/login.html'));
  })
app.post('/endpoint', function(req, res){
  var obj = {};
  console.log('body: ' + JSON.stringify(req.body));
  res.send(req.body);
});
//app.listen(8081);
var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port) })
