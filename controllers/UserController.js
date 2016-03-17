UserController = function() {};


UserController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);

    var fileName = __dirname + "./uploads/test" + file.name;

    fs.writefile(fileName, file, function(err){
        if(err) {
            console.log(err);
        }else{
            console.log("sucess");
        }
    })
}

module.exports = new UserController();