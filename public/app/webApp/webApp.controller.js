/**
 * Created by djdapz on 3/10/16.
 */

var WebAppController = function($scope, Upload, $timeout, $http, UserService){

    //setup variables
    $scope.initialized = undefined;
    $scope.username = "eecs352";
    $scope.playlist = undefined;
    $scope.addingMoreSongs =  false;
    $scope.weDidIt = undefined;
    $scope.showWaveForm = false;



    //functions for view managment
    $scope.enterUsername = function(username){
        UserService.user.username = username;
        $scope.username = username;
    };

    $scope.initialize = function(playlistName){
        $scope.playlist = UserService.initializePlaylist(playlistName);
        $scope.initialized = true;
    };

    $scope.lookIn = function(){
        var x =  1+1;
    };

    $scope.processSongs = function(){
        $scope.processing = true;
        $http({
            method: 'GET',
            url: '/mixedsong',
            headers:{
                'playlist_id': $scope.playlist.id
            }
        }).then(
            function onSuccess(response){
                UserService.ready=true;
                $scope.weDidIt = true;
            },  function onError(response){
                $scope.weDidIt = false;
            });
    };

    $scope.addMoreSongs =function(){
        $scope.addingMoreSongs =  true;
    };

    $scope.readytoseewaves = function(){
        $scope.showWaveform = true;
    }


    //variables for uploading

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
        $scope.percentagesBySong = [];
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var thisSong = {
                    name: files[i].name,
                    percentage: 0
                };
                $scope.percentagesBySong[files[i].name] = thisSong;
                if($scope.addingMoreSongs){
                    $scope.songsToDisplay.unshift(thisSong);
                }else{
                    $scope.songsToDisplay.push(thisSong);
                }

            }

            $scope.addingMoreSongs = false;
            $scope.percentageComplete = 0;

            $scope.uploadBegan = true;

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: '/upload/song',
                        data: {
                            username: $scope.username,
                            file: file
                        },
                        params:{
                            name:  $scope.playlist.id
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


};

/* recommended */
angular
    .module('app.webApp')
    .controller("WebAppController", WebAppController)
    .directive('focus',
    function($timeout) {
        return {
            scope: {
                trigger: '@focus'
            },
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value === "true") {
                        $timeout(function () {
                            element[0].focus();
                        })
                    }
                });
            }
        }
    });
;

WebAppController.$inject = ['$scope', 'Upload', '$timeout', '$http', 'UserService'];