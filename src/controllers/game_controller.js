(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller("GameController", GameController);

  GameController.$inject = ["$log", "userDataService", "$location", '$uibModal', 'authService', '$q', '$timeout'];

  function GameController($log, userDataService, $location, $uibModal, authService, $q, $timeout) {
    var vm = this;

    vm.message = "fun";


    vm.user = userDataService;
    vm.auth = authService;

    vm.level = "2";
    vm.loadData = function () {
      vm.currentUser = userDataService.currentUser;

      vm.level = userDataService.currentUser.level;
    }

    vm.wonGame = function (level) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'wonGame.html',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {
        vm.user.updateLevel(level);
      }).then(function () {
        vm.level = level;
        $log.log('the user level is ', vm.level, 'and the other level is', level);
      });

    }

    if (vm.level == '1') {
      vm.gameOneWon = false;
      vm.gameName = "Tic Tac Toe"
      // vm.turn = true;
      vm.box = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      var computerDone;
      var computerMove;
      vm.addTurn = function (num) {
        if (vm.box[num] === " ") {
            vm.box[num] = "X";
            $timeout(function(){
              computerTurn();
             }, 1400);
        }
        vm.checkForWinner();
      }

      var computerTurn = function() {
        computerDone = false;
        do {
          computerMove = Math.floor(Math.random() * 9);
          if (vm.box[computerMove] == " ") {
            vm.box[computerMove] = "O";
            computerDone = true;
            // vm.turn = true;
          }
        } while (!computerDone)
      }
      vm.reset = function (){
        vm.box = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      }
      vm.checkForWinner = function () {
        vm.box.forEach(function(singleBox, index) {
          if (singleBox === "X") {
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
          vm.wonGame('2');
        }
      }
    }

    if (vm.level == '2') {
      vm.gameWon = false;
      vm.gameName = "Decoder";
      var answer = "WDI graduates will ALL get great jobs";
      var originalAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      // var code = Math.floor((Math.random() * 7) + 1);
      var shuffledAlphabet = originalAlphabet.slice();
      var j;
      var temp;
      var codeAnswer = "";
      function shuffleArray(alphabet) {
        for (var i = 25; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = alphabet[i];
            alphabet[i] = alphabet[j];
            alphabet[j] = temp;
        }
        return alphabet;
      }
      shuffledAlphabet = shuffleArray(shuffledAlphabet);

      var alphaIndex;
      for (var i = 0; i < answer.length; i++) {
        if (answer[i] !== " ") {
          alphaIndex = originalAlphabet.indexOf(answer[i].toUpperCase());
          codeAnswer = codeAnswer + shuffledAlphabet[alphaIndex];
        } else {
          codeAnswer = codeAnswer + " ";
        }
      }
      vm.showAnswer = codeAnswer;
      vm.userAnswer = "";
      for (var i = 0; i < codeAnswer.length; i++) {
        vm.userAnswer = vm.userAnswer + " ";
      }

      $log.log('the original alphabet is ', originalAlphabet);
      $log.log('the shuffled alphabet is ', shuffledAlphabet);
      $log.log('the shuffled answer is ', codeAnswer);
       $log.log('the user answer is ', vm.userAnswer);

       vm.checkWinner = function () {
          if (vm.userAnswer.toUpperCase() == vm.showAnswer) {
            wonGame('3');
          } else {
            $log.log('you did not win');
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
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  };

})();
