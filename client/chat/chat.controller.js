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

            /**
             * Submits the message to server
             */
            ctrl.submit = function () {

                if (ctrl.isMsgValid()) {
                    //Emit to server with socketIo
                    socketIo.emit("chat message", ctrl.inputMessage);

                    // append to <ul> of #messages
                    ctrl.messages.push(ctrl.inputMessage);
                    // clear from input
                    ctrl.inputMessage = null;

                    //TODO re focus on input
                }
            };


        }]);