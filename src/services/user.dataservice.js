(function() {
  "use strict";

  angular
    .module("gameUpApp")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http", '$rootScope'];

  function userDataService($log, $http, $rootScope) {
    var user = {
      email:           "",
      name:            "",
      password:        "",
      dob:             new Date(1990, 10, 1),
      create:          create,
      clear:           clear,
      currentUserData: currentUserData,
      currentUser:     {},
      updateLevel:     updateLevel
    };

    return user;

    function create() {
      $log.debug("Attempting to create:", user);

      return $http({
        url:     "http://localhost:3000/api/users",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          email:    user.email,
          name:     user.name,
          password: user.password,
          level:    "1",
          dob:      user.dob.toISOString()
        })
      }).then(function() {
          currentUserData();
      });
    }

    function updateLevel(newLevel) {
      $log.debug("Attempting to update the level of :", user.currentUser.name);

      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          level: newLevel
        })
      }).then(function() {
          currentUserData();
          // $log.log('the updated data is', data.data);
          // authService.currentUser = data.data;
      });
    }

    function clear() {
      $log.debug("Clearing user.");

      user.email    = "";
      user.name     = "";
      user.password = "";
      user.dob      = "";
    }

    function currentUserData() {
      $log.debug("Retrieving current user data.");
      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "GET"
      }).then(function(data) {
        user.currentUser = data.data.data;
        $log.log('user is', user.currentUser);
        return user.currentUser;
      });
    }
  }

})();
