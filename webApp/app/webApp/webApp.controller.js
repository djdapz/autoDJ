/**
 * Created by djdapz on 3/10/16.
 */

var WebAppController = function($scope, Upload, $timeout){

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });

    $scope.log = '';
    $scope.percentagesBySong = [];
    $scope.percentageComplete = 0;
    $scope.totalPercentages = 0;
    $scope.uploadBegan = false;


    $scope.upload = function (files) {
        $scope.uploadBegan = true;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                $scope.percentagesBySong[files[i].name] = 0;

            }


            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);

                        //subtract old percentage
                        $scope.totalPercentages = $scope.totalPercentages - $scope.percentagesBySong[evt.config.data.file.name]

                        //replace with new percentage
                        $scope.percentagesBySong[evt.config.data.file.name] = progressPercentage;
                        $scope.totalPercentages = $scope.totalPercentages + progressPercentage;

                        $scope.percentageComplete = parseInt($scope.totalPercentages/files.length);

                    });
                }
            }
        }
    };


};

/* recommended */
angular
    .module('app.webApp')
    .controller("WebAppController", WebAppController);

WebAppController.$inject = ['$scope', 'Upload', '$timeout'];