"use strict";

angular.module("app")
    .factory('userService', function () {

            var user = {
                name: "",

                setName : function (name) {
                    this.name = name;
                }
            };

            return user;

        }
    );
