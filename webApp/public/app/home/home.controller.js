var HomeController = function($scope){

    $scope.iesCriteria = {
        interfaceName: null,
        deviceName: null,
    };



};

/* recommended */
angular
    .module('app.home')
    .controller("HomeController", HomeController);

HomeController.$inject = ['$scope'];