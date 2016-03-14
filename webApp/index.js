var express = require('express');
var fs = require('fs');
var http= require('http');
// Requires multiparty
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
UserController = require('./controllers/UserController');
var app = express();

//serve frontend
app.use(express.static(__dirname + '/public'));



// Requires controller
var UserController = require('./controllers/UserController');

// Example endpoint
app.post('/upload/song', multipartyMiddleware,function(req, res) {
    var file = req.files.file;

    var fileName = __dirname + "/uploads/" + file.name;

    console.log("BEGIN: " + fileName);


    var fileSaveStream = fs.createReadStream(file.path).pipe(fs.createWriteStream(fileName));

    fileSaveStream.on('finish', function () {
        fs.unlink(file.path, function(err){
            if(err){
                console.log("error unlinking file");
            }
        });
        console.log("END: " + file.name);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<!doctype html><html><head><title>response</title></head><body>');
        res.write("song: "+file.name + " uploaded");
        res.end('</body></html>');
    });


});





app.listen(3000,function(){
    console.log("Working on port 3000");
});