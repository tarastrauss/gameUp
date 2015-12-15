(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller("GameController", GameController);

  GameController.$inject = ["$log"];


  function GameController($log) {
    var vm = this;

    vm.message = "fun";

    // vm.user = userDataService;

  }
})();
