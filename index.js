var express = require('express');
var fs = require('fs');
var http= require('http');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var PythonShell = require('python-shell');
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
    var temp = __dirname + "/completePlaylists/"+ playlist_id + ".mp3";
    var originName = temp.replace("webApp", "pythonServer");


    //tell python to go to work
    var options = {
        host: 'localhost',
        port: 5000,
        path: '/process/' + playlist_id,
        method: 'get'
    };


    http.request(options, function(response){
        var body = '';
        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function () {
            console.log(body);
            //don't closeout reuqest till python has done its magic
            secondFunction(body)
        });
    }).end();




    var secondFunction =  function(path){
        //move file from python server to public folder
        var fileSaveStream = fs.createReadStream(originName).pipe(fs.createWriteStream(fileName));
        //close out request
        fileSaveStream.on('finish', function () {
            console.log("END: " + playlist_id);
            var responseJson =  JSON.stringify({
                file_location: playlist_id,
            });
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(responseJson);
            res.end();
        });
    }



});
//TODO -  split up into modules and clean up this messy code




app.listen(3000,function(){
    console.log("Working on port 3000");
});