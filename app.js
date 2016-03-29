'use strict';

var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(server);

//use environment var PORT or 3001
var portNum = 3001;

//route handler
app.get("/", function (req, res) {
    res.sendFile("./index.html", {root: "./client/"});
});

app.use(express.static('./client'));

io.on("connection", function (socket) {

    socket.on("chatMsg", function (userMsg) {

        console.log("chatMsg " + userMsg.userName + " " + userMsg.msg);

        io.emit('updateClients', userMsg);

    });
});


server.listen(portNum, function () {
    console.log("listening on port: " + portNum);
});
