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
    var dir = __dirname + "/uploads/" + req.query.name;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    var fileName = dir +"/" + file.name;
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

app.get('/mixedsong', function(req,res){
    var playlist_id = req.headers['playlist_id'];

    var fileName = __dirname + "/public/songs/" + playlist_id + ".mp3";
    var originName = __dirname + "/uploads/" + "djdapz_pl1" + "/"+ 'djdapz_pl1' + ".mp3";

    //IMPORTANT Keep this line for when python code is set up,
    //var originName = __dirname + "/uploads/" + playlist_id + "/"+ playlist_id + ".mp3";



    console.log("BEGIN: " + fileName);


    var fileSaveStream = fs.createReadStream(originName).pipe(fs.createWriteStream(fileName));
    fileSaveStream.on('finish', function () {

        console.log("END: " + playlist_id);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<!doctype html><html><head><title>response</title></head><body>');
        res.write("song: "+ + playlist_id + " uploaded");
        res.end('</body></html>');
    });


});
//TODO -  split up into modules and clean up this messy code





app.listen(3000,function(){
    console.log("Working on port 3000");
});