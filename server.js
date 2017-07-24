var express = require('express');

var app = express();

//Serve static files in the root directory:
app.use(express.static('public'));
//Serve the node_modules files without the need for full path:
app.use(express.static('node_modules'));

app.all('[^.]+', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

// Start a server listener
app.listen(3333, function() {
    console.log("App: " + app.name + " is listening on 3333. ");

});
