"use strict";

angular.module("app", ["ngRoute"]).
config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "chat/chat.html",
            controller: "ChatController"
        }).
        otherwise({
            redirectTo: "/"
        });
    }]);