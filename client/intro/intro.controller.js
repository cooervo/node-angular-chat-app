"use strict";

angular.module("app")
    .controller('introController', [
        '$location',
        'userService',
        function ($location, userService) {

            var ctrl = this;

            ctrl.isUserNameValid = function () {

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

                    userService.setName(ctrl.inputName)

                    $location.path('/chat');
                }
            };


        }]
    );