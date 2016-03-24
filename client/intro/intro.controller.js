"use strict";

angular.module("app")
    .controller('introController', [
        '$location',
        'userService',
        function ($location, userService) {

            var socketIo = io.connect("http://localhost:3000"); //TODO create var for localhost

            var ctrl = this;


            ctrl.isUserNameValid = function () {
                //TODO: protect against inyections & Hacks

                if (ctrl.inputName) {
                    return true;
                }

                return false;
            };


            /**
             * Submits the message to server
             */
            ctrl.submit = function () {

                if (ctrl.isUserNameValid()) {
                    //Emit to server with socketIo
                    socketIo.emit("user input", ctrl.inputName);

                    userService.setName(ctrl.inputName)

                    console.log("userService.name " + userService.name)
                    $location.path('/chat');
                }
            };


        }]
    );