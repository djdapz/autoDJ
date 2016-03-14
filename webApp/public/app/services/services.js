/**
 * Created by djdapz on 3/14/16.
 */


/* Services */

var appServices = angular.module('app.services', []);

appServices.factory('UserService', [function() {
    var user = {
        username: undefined
    };

    var playlists= [];

    var currentPlaylist = {
        name: undefined,
        id: undefined,
        link: undefined
    };



    return {
        startMonitoring: function () {
            $rootScope.$on('$routeChangeSuccess', function () {
                batchLog($route.current ? $route.current.template : null);
            });

        },

        user: user,

        playlist: currentPlaylist,

        initializePlaylist: function(playlistName){
            currentPlaylist.name = playlistName;
            currentPlaylist.id = user.username + '_' +playlistName;
            currentPlaylist.id.replace(/\s+/g, '-');

            //add to or update array
            playlists[currentPlaylist.id] = currentPlaylist;



            return currentPlaylist;
        }





    }
}]);

