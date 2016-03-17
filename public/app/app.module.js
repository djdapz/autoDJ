/**
 * Created by djdapz on 3/10/16.
 */
(function(angular) {
    angular.module("app.home", []);
    angular.module("app.webApp", []);
    angular.module("app.song", []);

    angular.module("app", ["ngResource",
        "ngRoute",
        "ngFileUpload",
        "ui.bootstrap",
        "app.services",
        "app.home",
        "app.webApp",
        "app.song"]);

}(angular));