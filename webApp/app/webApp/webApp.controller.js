/**
 * Created by djdapz on 3/10/16.
 */

var webAppController = function($scope){

    $scope.name = "bobby p"


};

/* recommended */
angular
    .module('app.webApp')
    .controller("webAppController", webAppController);

webAppController.$inject = ['$scope'];