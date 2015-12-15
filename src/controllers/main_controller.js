(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller("MainController", MainController);

  MainController.$inject = ["$log"];


  function MainController($log) {
    var vm = this;

    vm.message = "fun";

    vm.username;
    vm.password;

  }
})();
