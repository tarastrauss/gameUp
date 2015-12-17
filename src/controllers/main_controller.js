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

  }

})();
