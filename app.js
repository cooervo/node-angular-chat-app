'use strict';

var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//route handler
app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.sendFile("./index.html", {root: "./client/"});
});

app.use(express.static('./client'));

io.on("connection", function (socket) {

    socket.on("chat_message", function (msg) {
        console.log(msg)

        socket.broadcast.emit('update_clients', msg);


        //TODO hacer algo con el msg en el server side?

        // TODO ejemplo para enviar al client: io.emit('chat message', msg);
    });
});

var portNum = 3001;

http.listen(portNum, function () {
    console.log("listening on port: " + portNum);
});