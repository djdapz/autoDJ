/**
 * Created by djdapz on 3/14/16.
 */

//TODO  implement controller for an audio player that pulls from /songs AFTER the song is uploaded to the public folder


var SongPlayerController = function($scope, UserService){
    //$scope.user = UserService.user;
    //$scope.playlist = UserService.playlist;

    //$scope.user = UserService.user;
    $scope.playlist = {
        id: "djdapz_lenerd.mp3"
    }


};

/* recommended */
angular
    .module('app.song')
    .controller("SongPlayerController", SongPlayerController);

HomeController.$inject = ['$scope', 'UserService'];