(function() {
  "use strict";

  angular
    .module("gameUpApp")
    .factory("authService", authService);

  authService.$inject = ["$log", "$http", "tokenService", '$state', 'userDataService'];

  function authService($log, $http, tokenService, $state, userDataService) {
    var auth = {
      email:      "",
      password:   "",
      logIn:      logIn,
      logOut:     logOut,
      clear:      clear,
      isLoggedIn: (tokenService.get() !== null),
      currentUser: currentUser
    };
    var currentUser;


    return auth;

    function logIn() {
      $log.debug("Logging in with credentials:", {email: auth.email, password: auth.password});

      return $http({
        url:     "http://localhost:3000/api/token",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          email:    auth.email,
          password: auth.password,
        })
      }).then(function(data, status, headers, config) {
        tokenService.set(data.data.token)
        auth.isLoggedIn = true;
        // userDataService.currentUserData();
        currentUser = data.user;
        return data;
      });
    }

    function logOut() {
      tokenService.clear();
      auth.isLoggedIn = false;
      $log.log('logged out!');
      $state.go('landingPage');
    }

    function clear() {
      auth.email    = "";
      auth.password = "";
    }
  }

})();
