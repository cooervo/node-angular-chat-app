'use strict';

var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    io = require("socket.io")(server);

//use environment var PORT or 3001
var portNum = 3001;

//route handler
app.get("/", function (req, res) {
    res.sendFile("./index.html", {root: "./client/"});
});

app.use(express.static('./client'));

io.on("connection", function (socket) {

    socket.on("chatMsg", function (userMsg) {

        io.emit('updateClients', userMsg);

    });
});


server.listen(portNum, function () {
    console.log("listening on port: " + portNum);
});
