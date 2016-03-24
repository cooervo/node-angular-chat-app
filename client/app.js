"use strict";

angular.module("app", ["ngRoute"])
    .config(["$routeProvider",

        function ($routeProvider) {

            $routeProvider.
            when("/", {
                templateUrl: "intro/intro.view.html",
                controller: "introController"

            }).when("/chat", {
                templateUrl: "chat/chat.view.html",
                controller: "chatController"
            }).
            otherwise({
                redirectTo: "/"
            });

        }]
    );