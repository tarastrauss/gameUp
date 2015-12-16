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
      level:           1,
      create:          create,
      clear:           clear,
      currentUserData: currentUserData,
      currentUser: currentUser
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
          level:    1,
          dob:      user.dob.toISOString()
        })
      });
    }

    function clear() {
      $log.debug("Clearing user.");

      user.email    = "";
      user.name     = "";
      user.password = "";
      user.dob      = "";
    }

    var currentUser = "";

    function currentUserData() {
      $log.debug("Retrieving current user data.");

      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "GET"
      }).then(function(data) {
        // $log.log('data is', data.data.data);
        currentUser = data.data.data;
        $log.log('user is', currentUser);
        return currentUser;
      });
    }
  }

})();
