/**
 * Created by djdapz on 3/14/16.
 */


/* Services */

var appServices = angular.module('app.services', []);

appServices.factory('UserService', [function() {
    var user = {
        username: undefined
    };

    var ready = false;

    var playlists= [];

    var currentPlaylist = {
        name: undefined,
        id: undefined,
        link: undefined
    };


    return {
        user: user,
        ready: ready,
        playlist: currentPlaylist,

        initializePlaylist: function(playlistName){
            currentPlaylist.name = playlistName;
            var x = new Date();
            var time = x.getTime();
            currentPlaylist.id = user.username + '_' +playlistName + time;

            currentPlaylist.id = currentPlaylist.id.replace(/\s/g, '');
            //add to or update array
            playlists[currentPlaylist.id] = currentPlaylist;
            return currentPlaylist;
        }


    }
}]);

