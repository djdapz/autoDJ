/**
 * Created by djdapz on 3/10/16.
 */

var WebAppController = function($scope, Upload, $timeout){


    $scope.log = '';
    $scope.percentagesBySong = [];
    $scope.percentageComplete = 0;
    $scope.totalPercentages = 0;
    $scope.uploadBegan = false;
    $scope.songsUploaded = [];
    $scope.songsToDisplay = [];
    $scope.processing = false;

    //uploading functions
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });


    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var thisSong = {
                    name: files[i].name,
                    percentage: 0
                };
                $scope.percentagesBySong[files[i].name] = thisSong;


                $scope.songsToDisplay.push(thisSong);
            }
            $scope.uploadBegan = true;

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'localhost:8080/uploading',
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

                        var songName = evt.config.data.file.name;
                        //subtract old percentage
                        $scope.totalPercentages = $scope.totalPercentages - $scope.percentagesBySong[songName].percentage

                        if(progressPercentage == 100 && $scope.percentagesBySong[songName].percentage!=100){
                            $scope.songsUploaded.push(songName)
                        }

                        //replace with new percentage
                        $scope.percentagesBySong[songName].percentage = progressPercentage;
                        $scope.totalPercentages = $scope.totalPercentages + progressPercentage;
                        $scope.percentageComplete = parseInt($scope.totalPercentages/files.length);

                    });
                }
            }
        }
    };

    $scope.lookIn = function(){
        var x =  1+1;
    }

    $scope.processSongs = function(){
        $scope.processing = true;
    }

};

/* recommended */
angular
    .module('app.webApp')
    .controller("WebAppController", WebAppController);

WebAppController.$inject = ['$scope', 'Upload', '$timeout'];