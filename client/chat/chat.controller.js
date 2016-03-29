"use strict";

angular.module("app")
    .controller("chatController", [
        'userService','$scope',
        function (userService, $scope) {

            var ctrl = this;
            ctrl.messages = [];
            ctrl.socketIo = io();


            ctrl.submit = function () {
                ctrl.socketIo.emit("chatMsg", {name: userService.name, msg: ctrl.inputMessage});
                ctrl.inputMessage = null;
            };


            ctrl.socketIo.on("updateClients", function (userMsg) {
                ctrl.messages.push(userMsg);
                //apply changes to angular
                $scope.$apply();
            });


        }]);
