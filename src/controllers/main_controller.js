(function() {
  "use strict";

  angular
    .module("gameUpApp")
    .controller("MainController", MainController);

  MainController.$inject = ["userDataService", "authService", "$log", "$state"];

  function MainController(userDataService, authService, $log, $state) {
    var vm = this;

    vm.user = userDataService;
    vm.auth = authService;

    vm.successMessage = "Present all of the current user's data here.";
    vm.failureMessage = "Present any error messages here.";

    vm.currentUser = userDataService.currentUser;

    vm.updateUser = function () {
        vm.currentUser = userDataService.currentUser;
    }

    // vm.createUser = function() {
    //   $log.log('creating user!');
    //   vm.user.create()

    //   .then(function(data, status, headers, config) {
    //     $log.debug("Success:", data,status,headers,config)

    //     vm.successMessage = angular.toJson(data.data);
    //     vm.failureMessage = "Present any error messages here.";
    //     vm.user.clear();
    //     $state.go('gamePage')
    //   })

    //   .catch(function(data, status, headers, config) {
    //     $log.debug("Failure:", data,status,headers,config)

    //     vm.successMessage = "Present all of the current user's data here.";
    //     vm.failureMessage = angular.toJson(data.data);
    //   });
    // };

    // vm.logInUser = function() {
    //   vm.auth.logIn()

    //   .then(function(data) {
    //     $log.debug("Success:", data)

    //     return vm.user.currentUserData();
    //   })

    //   .then(function(data) {
    //     $log.debug("Success:", data)

    //     vm.auth.clear();

    //     vm.successMessage = angular.toJson(data.data);
    //     vm.failureMessage = "Present any error messages here.";
    //   })

    //   .catch(function(data, status, headers, config) {
    //     $log.debug("Failure:", data, status, headers, config)

    //     vm.successMessage = "Present all of the current user's data here.";
    //     vm.failureMessage = angular.toJson(data.data);
    //   });
    // };
  }

})();
