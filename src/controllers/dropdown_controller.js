(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller('DropdownController', DropdownController);

  DropdownController.$inject = ["$scope", "$log", "userDataService", "authService"];

  function DropdownController ($scope, $log, userDataService, authService) {

    var dd = this;
    dd.user = userDataService;
    dd.auth = authService;
    dd.message="hi";

    dd.items = [
      'Profile',
      'Logout'
    ];

    dd.status = {
      isopen: false
    };

    dd.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };

    dd.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    dd.currentUser = userDataService.currentUser;

  };

})();
