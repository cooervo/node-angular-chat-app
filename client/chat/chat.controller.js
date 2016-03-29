"use strict";

angular.module("app")
    .controller("chatController", [
        'userService',
        function (userService) {


            var ctrl = this;
            ctrl.messages = [];

            ctrl.socketIo = io();
            ctrl.userName = userService.name;

            ctrl.submit = function () {
               
               ctrl.socketIo.emit("chat_message", ctrl.inputMessage);

               ctrl.messages.push(ctrl.inputMessage);           

               ctrl.inputMessage = null;
            };


            ctrl.socketIo.on("update_clients", function (msg) {

                ctrl.messages.push(msg);

            });


        }]);
