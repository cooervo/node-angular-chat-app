"use strict";

angular.module("app")
    .controller("chatController", [
        'userService','$scope',
        function (userService, $scope) {

            var ctrl = this;
            ctrl.messages = [];

            ctrl.socketIo = io();
            ctrl.userName = userService.name;
            ctrl.userMsg = userService.name;

            ctrl.submit = function () {

                ctrl.socketIo.emit("chatMsg", {userName: userService.name, msg: ctrl.inputMessage});

                ctrl.inputMessage = null;
            };


            ctrl.socketIo.on("updateClients", function (userMsg) {

                ctrl.userMsg = userMsg;
                ctrl.messages.push(userMsg.msg);

                //apply changes to angular
                $scope.$apply();
            });


        }]);
