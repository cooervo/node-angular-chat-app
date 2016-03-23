'use strict';

var express = require("express"); //TODO cambiar de express a hapi
var app = require("express")(); //TODO cambiar de express a hapi
var http = require("http").Server(app);
var io = require("socket.io")(http);

//route handler
app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.sendFile("./index.html", {root: "./client/"});
});

app.use(express.static('./client'));


io.on("connection", function (socket) {
    socket.on("chat message", function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log("listening on port: 3000");
});