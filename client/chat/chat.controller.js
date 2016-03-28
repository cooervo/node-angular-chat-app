"use strict";

angular.module("app")
    .controller("chatController", [
        'userService',
        function (userService) {

            var socketIo = io.connect("http://localhost:3000"); //TODO create var for localhost

            var ctrl = this;
            ctrl.messages = [];

            ctrl.userName = userService.name;

            ctrl.isMsgValid = function () {
                //TODO: protect against inyections & Hacks

                if (ctrl.inputMessage) {
                    return true;
                }

                return false;
            };


            ctrl.submit = function () {

                if (ctrl.isMsgValid()) {
                    //Emit to server with socketIo
                    socketIo.emit("chat_message", ctrl.inputMessage);

                    // append to <ul> of #messages
                    ctrl.messages.push(ctrl.inputMessage);

                    // clear from input
                    ctrl.inputMessage = null;

                    //TODO re focus on input
                }
            };


            socketIo.on("update_clients", function (msg) {
                console.log("update_clients " + msg);

                // append to <ul> of #messages
                ctrl.messages.push(msg);

                // clear from input
                ctrl.inputMessage = null;
            });


        }]);