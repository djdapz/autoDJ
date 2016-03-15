/**
 * Created by djdapz on 3/10/16.
 */
(function(angular) {

    angular.module("app")
        .filter('urlEncode', function(){
            return window.encodeURIComponent;
        }).config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeController'}).
                when('/webApp',{
                    templateUrl: 'partials/webApp.html',
                    controller: "WebAppController"
                }).
                when('/play',{
                    templateUrl: 'partials/songPlayer.html',
                    controller: "SongPlayerController"
                }).
                otherwise({
                    redirectTo: '/webApp'
                });

        }]);

}(angular));