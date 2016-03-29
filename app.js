'use strict';

var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//use environment var PORT or 3001
var portNum = process.env.PORT || 3001;


//route handler
app.get("/", function (req, res) {

    res.sendFile("./index.html", {root: "./client/"});
});

app.use(express.static('./client'));

io.on("connection", function (socket) {

    socket.on("chat_message", function (msg) {

        socket.broadcast.emit('update_clients', msg);
	io.sockets.emit("update_clients", msg);	

        console.log("NODE chat_message " + msg)
        //TODO hacer algo con el msg en el server side?

        // TODO ejemplo para enviar al client: io.emit('chat message', msg);
    });
});


http.listen(portNum, function () {
    console.log("listening on port: " + portNum);
});
