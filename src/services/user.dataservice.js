(function() {
  "use strict";

  angular
    .module("gameUpApp")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http"];

  function userDataService($log, $http) {
    var user = {
      email:           "",
      name:            "",
      password:        "",
      dob:             new Date(1990, 10, 1),
      create:          create,
      clear:           clear,
      currentUserData: currentUserData
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

    function currentUserData() {
      $log.debug("Retrieving current user data.");

      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "GET"
      });
    }
  }

})();
