var express = require('express');
var fs = require('fs');
var multer = require('multer');
var app = express();

//serve frontend
app.use(express.static(__dirname + '/public'));

app.post('/upload/song', function(request, respond) {
    var body = '';
    var title = "/uploads/" + request.query.name;
    filePath = __dirname + title;
    console.log('uploading' + title);
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });

})



app.listen(3000,function(){
    console.log("Working on port 3000");
});