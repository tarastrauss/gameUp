(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller("GameController", GameController);

  GameController.$inject = ["$log", "userDataService", "$location", '$uibModal', 'authService', '$q', '$timeout', '$state', '$scope'];

  function GameController($log, userDataService, $location, $uibModal, authService, $q, $timeout, $state, $scope) {
    var vm = this;

    vm.message = "fun";


    vm.user = userDataService;
    vm.auth = authService;


    vm.loadData = function () {
      userDataService.currentUserData()
      .then(function() {
        if (vm.user.currentUser.level == '1') {
          vm.game1();
        } else if (vm.user.currentUser.level == '2') {
          vm.game2();
        } else if (vm.user.currentUser.level == '3') {
          vm.game3();
        } else if (vm.user.currentUser.level == '4') {
          vm.game4();
        } else if (vm.user.currentUser.level == '5') {
          vm.game5();
        }
        vm.currentUser = userDataService.currentUser;
      });

    }

    vm.loadGame = function(level) {
      if (level == '1') {
        vm.game1();
      } else if (level == '2') {
        vm.game2();
      } else if (level == '3') {
        vm.game3();
      } else if (level == '4') {
        vm.game4();
      } else if (level == '5') {
        vm.game5();
      }
    }

    vm.wonGame = function (level) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'wonGame.html',
        controller: ModalInstanceController
      });
      modalInstance.result.then(function () {
        vm.user.updateLevel(level);
        vm.loadGame(level);

      })
    }

    vm.game1 = function () {
        vm.gameOneWon = false;
        vm.gameName = "Tic Tac Toe"
        // vm.turn = true;
        vm.box = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        var computerDone;
        var computerMove;
        vm.addTurn = function (num) {
          if (vm.box[num] === " ") {
              vm.box[num] = "X";
              vm.checkForWinner();
              if (!vm.gameOneWon) {
                $timeout(function(){
                  computerTurn();
                 }, 700);
              }
          }
        }

        var computerTurn = function() {
          computerDone = false;
          do {
            computerMove = Math.floor(Math.random() * 9);
            if (vm.box[computerMove] == " ") {
              vm.box[computerMove] = "O";
              computerDone = true;
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
            // vm.user.updateLevel('2');
          }
        }
      }

    vm.game3 = function() {
     // if (vm.level == '2') {
        $log.log('user is in level 3!');
        vm.gameName = "Cryptogram";
        vm.tryAgain = false;
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
        vm.userAnswer = []
        for (var i = 0; i < codeAnswer.length; i++) {
          vm.userAnswer.push(' ');
        }
        $log.log('the original alphabet is ', originalAlphabet);
        $log.log('the shuffled alphabet is ', shuffledAlphabet);
        $log.log('the shuffled answer is ', codeAnswer);
        $log.log('the user answer is ', vm.userAnswer);

         vm.checkWinner = function () {
          var userString = "";
          vm.userAnswer.forEach(function(letter) {
            userString = userString + letter.toUpperCase();
          })
            $log.log(userString);
            if (userString == answer.toUpperCase()) {
              vm.wonGame('4');
              $log.log('you have won!');
            } else {
              $log.log('you did not win');
              vm.tryAgain = true;
            }
         }
      }

      vm.game2 = function () {
        $log.log('you are now in game 2!');
        vm.gameName = "Sudoku (4 x 4)";
        // debugger;
        var win = false;
        vm.tryAgain = false;
        vm.box = [];
        for (var i = 0; i < 16; i++) {
          vm.box.push("");
        }
        vm.setBox = [];
        for (var i = 0; i < 16; i++) {
          vm.setBox.push('false');
        }
        var chooseBox = Math.floor((Math.random() * 2) + 1);
        var showNum;
        var toSix = 0;
        if (chooseBox === 1) {
          var solutionBox = [4, 3, 2, 1, 1, 2, 3, 4, 3, 4, 1, 2, 2, 1, 4, 3];
        } else {
          var solutionBox = [2, 3, 4, 1, 1, 4, 3, 2, 3, 2, 1, 4, 4, 1, 2, 3];
        }
        do {
          showNum = Math.floor(Math.random() * 16)
          if (vm.setBox[showNum] === 'false') {
            vm.box[showNum] = solutionBox[showNum];
            vm.setBox[showNum] = "true";
            toSix++;
          }
        } while (toSix < 6);
        vm.checkWin = function () {
          win = true;
          vm.box.forEach(function(singleBox, index){
            if (win) {
              if (singleBox !== solutionBox[index]) {
                win = false;
              }
            }
          });
          if (win) {
            vm.wonGame('3');
          } else {
            $log.log('you have not won');
            vm.tryAgain = true;
          }
        }
      }

      vm.game4 = function () {
        vm.gameName = "Memory";
        vm.image = [];
        // vm.image[1] = "/assets/img/lightning1.jpeg"
        var black = "/assets/img/black.png";
        vm.viewImage = [black, black, black, black, black, black, black, black, black, black, black, black, black, black, black, black];
        var image1 = "/assets/img/lightning1.jpeg";
        var image2 = "/assets/img/lightning2.jpeg";
        var image3 = "/assets/img/lightning3.jpeg";
        var image4 = "/assets/img/lightning4.jpeg";
        var image5 = "/assets/img/lightning5.jpeg";
        var image6 = "/assets/img/lightning6.jpeg";
        var image7 = "/assets/img/lightning7.jpeg";
        var image8 = "/assets/img/lightning8.jpeg";
        var randomNum;
        var firstClicked = "";
        var imageCounter = 1;
        var matches = 0;
        do {
          randomNum = Math.floor(Math.random() * 16);
          if (vm.image[randomNum] === undefined) {
            switch (imageCounter) {
              case 1: vm.image[randomNum] = image1;
              break;
              case 2: vm.image[randomNum] = image1;
              break;
              case 3: vm.image[randomNum] = image2;
              break;
              case 4: vm.image[randomNum] = image2;
              break;
              case 5: vm.image[randomNum] = image3;
              break;
              case 6: vm.image[randomNum] = image3;
              break;
              case 7: vm.image[randomNum] = image4;
              break;
              case 8: vm.image[randomNum] = image4;
              break;
              case 9: vm.image[randomNum] = image5;
              break;
              case 10: vm.image[randomNum] = image5;
              break;
              case 11: vm.image[randomNum] = image6;
              break;
              case 12: vm.image[randomNum] = image6;
              break;
              case 13: vm.image[randomNum] = image7;
              break;
              case 14: vm.image[randomNum] = image7;
              break;
              case 15: vm.image[randomNum] = image8;
              break;
              case 16: vm.image[randomNum] = image8;
              break;
            }
              imageCounter++;

          }
        } while (imageCounter <= 16);

        vm.displayImage = function(index){
          vm.viewImage[index] = vm.image[index];
          if (firstClicked === "") {
            firstClicked = index;
          } else {
            if (!checkForSame(index, firstClicked)){
              $timeout(function(){
                vm.viewImage[index] = black;
                vm.viewImage[firstClicked] = black;
                firstClicked = "";
              }, 1200);
            } else {
              matches++;
              firstClicked="";
              checkForWinner();
            }
          }
        }
        function checkForSame (second, first) {
          return (vm.image[second] === vm.image[first]);
        }

        function checkForWinner() {
          $log.log('there are ', matches, ' matches');
          if (matches === 8) {
            vm.wonGame('5');
          }
        }

      }

      vm.game5 = function () {
        vm.gameName = "coming soon!";
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
