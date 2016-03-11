var homeController = function($scope){

    $scope.iesCriteria = {
        interfaceName: null,
        deviceName: null,
    };



};

/* recommended */
angular
    .module('app.home')
    .controller("homeController", homeController);

homeController.$inject = ['$scope'];