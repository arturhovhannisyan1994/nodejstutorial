var path =  require('path');
var fs = require('fs');
function queryReader() {
    this.path = path.join(__dirname,'../','queries');
    this.getContent = function (queryFileName) {
       return fs.readFileSync(path.join(this.path,queryFileName+'.txt')).toString();
    }
}
module.exports = queryReader;
