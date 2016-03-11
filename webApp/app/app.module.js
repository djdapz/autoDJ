/**
 * Created by djdapz on 3/10/16.
 */
(function(angular) {
    angular.module("app.home", []);
    angular.module("app.webApp", []);

    angular.module("app", ["ngRoute",
        "ui.bootstrap",
        "app.home",
        "app.webApp"]);

}(angular));