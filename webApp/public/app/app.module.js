/**
 * Created by djdapz on 3/10/16.
 */
(function(angular) {
    angular.module("app.home", []);
    angular.module("app.webApp", []);
    angular.module("app.song", []);

    angular.module("app", ["ngRoute",
        "ngFileUpload",
        "ui.bootstrap",
        "app.home",
        "app.webApp",
        "app.song"]);

}(angular));