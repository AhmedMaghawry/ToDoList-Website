var fs = require("fs");
fs.writeFileSync("test.text","This is a test file");
console.log(fs.readFileSync("test.text").toString());
