(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller("GameController", GameController);
      // .config(specificGameRoutes);

  GameController.$inject = ["$log", "userDataService", "$location", '$uibModal'];
  // specificGameRoutes.$inject = ["$stateProvder"];

  function GameController($log, userDataService, $location, $uibModal) {
    var vm = this;

    vm.message = "fun";

    vm.user = userDataService;
    vm.currentUser = vm.user.currentUser;

    vm.wonGame = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'wonGame.html',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {
        vm.user.updateLevel("2");

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    }

    if (vm.currentUser.level == '1') {
      vm.gameOneWon = false;
      vm.gameName = "Tic Tac Toe"
      vm.turn = true;
      vm.box = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      vm.addTurn = function (num) {
        if (vm.box[num] === " ") {
          if (vm.turn) {
            vm.box[num] = "X";
            vm.turn = false;
          } else {
            vm.box[num] = "O";
            vm.turn = true;
          }
        }
        vm.checkForWinner();
      }
      vm.reset = function (){
        vm.box = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
      }
      vm.checkForWinner = function () {
        vm.box.forEach(function(singleBox, index) {
          if (singleBox !== " ") {
            if (index === 0 || index === 3 || index === 6) {
              if (singleBox === vm.box[index + 1] && singleBox === vm.box[index + 2]) {
                vm.gameOneWon = true;
              }
            }
            if (index === 0 || index === 1 || index === 2) {
              if (singleBox === vm.box[index + 3] && singleBox === vm.box[index + 6]) {
                vm.gameOneWon = true;
              }
            }
            if (index === 0){
              if (singleBox === vm.box[index + 4] && singleBox === vm.box[index + 8]) {
                vm.gameOneWon = true;
              }
            }
            if (index === 2) {
              if (singleBox === vm.box[index + 2] && singleBox === vm.box[index + 4]) {
                vm.gameOneWon = true;
              }
            }
          }
        });
        if (vm.gameOneWon) {
          vm.wonGame("2");
        }
      }
    }
  }

  angular
    .module("gameUpApp")
    .controller("ModalInstanceController", ModalInstanceController);

  ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'authService', 'userDataService', '$log', '$state'];

  function ModalInstanceController($scope, $uibModalInstance, authService, userDataService, $log, $state) {

    $scope.user = userDataService;
    $scope.auth = authService;

    $scope.random = Math.floor((Math.random() * 2) + 1);
    $scope.color = $scope.random === 1 ? "primary" : "danger";

    $scope.ok = function () {
      $uibModalInstance.close();
      // $state.go('gamePage');

    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  };

})();
