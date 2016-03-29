"use strict";

angular.module("app")
    .controller("chatController", [
        'userService',
        function (userService) {


            var ctrl = this;
            ctrl.messages = [];

            ctrl.socketIo = io.connect(); //TODO create var for localhost
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
                    ctrl.socketIo.emit("chat_message", ctrl.inputMessage);


                    //TODO re focus on input


                    ctrl.messages.push(ctrl.inputMessage);
                    console.log("ANGULAR chat_message " + ctrl.inputMessage)
                }


                ctrl.inputMessage = null;
            };


            ctrl.socketIo.on("update_clients", function (msg) {

                // add to array and ng-repeat updates the list of messages

                ctrl.messages.push(msg);
                console.log("ANGULAR update_clients " + msg)


            });


        }]);
