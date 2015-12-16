(function() {
  "use strict";

  angular
      .module("gameUpApp")
      .controller("ModalController", ModalController);

  ModalController.$inject = ['$uibModal', '$scope', '$timeout', 'userDataService', '$state'];

  function ModalController($uibModal, $scope, $timeout, userDataService, $state) {

    $scope.userDataService = userDataService;

    $scope.changeState = function () {
      $timeout(function(){
        $state.go('gamePage');
      }, 1100);
    }

    $scope.openLogin = function (){

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'loginModal.html',
        size: 'sm',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

    };

    $scope.openStarted = function (){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'startedModal.html',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {
        $scope.openSignUp();
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openSignUp= function (){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'signUpModal.html',
        controller: ModalInstanceController,
        resolve: {

        }
      });

      modalInstance.result.then(function () {

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };



    // $timeout(function() {
    //  $('#intro-buttons').append('<span id="login" ng-click="openLogin('true')" class="intro btn btn-default fadeIn animated"> Login </span>');
    //  $('#intro-buttons').append('<span id="started" class="intro btn btn-default fadeIn animated" > Get Started </span>');
    // }, 1100);

    $timeout(function(){
      $scope.showLoginButtons = true;
    }, 1100);
    // $('.content').on("click", "#login", function() {
    //   $scope.openLogin('true');
    // });

    // $('.content').on("click", "#started", function() {
    //   $scope.openStarted();
    // });

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
        $state.go('gamePage');

      };

      $scope.createUser = function() {
        $log.log('creating user!');
        $scope.user.create()

        .then(function(data, status, headers, config) {
          $log.debug("Success:", data,status,headers,config)

          // $scope.successMessage = angular.toJson(data.data);
          $scope.failureMessage = "Present any error messages here.";
          // $scope.user.clear();
          $uibModalInstance.close();
          $state.go('gamePage');
          $scope.logInUser();
        })

        .catch(function(data, status, headers, config) {
          $log.debug("Failure:", data,status,headers,config)

          $scope.successMessage = "Present all of the current user's data here.";
          $scope.failureMessage = angular.toJson(data.data);
        });
      };

      $scope.logInUser = function() {
        $scope.auth.email = $scope.user.email;
        $scope.auth.password = $scope.user.password;
        $scope.auth.logIn()

          .then(function(data) {
            $log.debug("Success:", data)

             return $scope.user.currentUserData();
          })

          .then(function(data) {
            $log.debug("Success logging user:", data)
            $scope.user.currentUser = data;
            $uibModalInstance.close();
            $state.go('gamePage');
            $scope.auth.clear();

            $scope.successMessage = angular.toJson(data.data);
            $scope.failureMessage = "Present any error messages here.";
          })

          .catch(function(data, status, headers, config) {
            $log.debug("Failure:", data, status, headers, config)

            $scope.successMessage = "Present all of the current user's data here.";
            $scope.failureMessage = angular.toJson(data.data);
          });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };


      $scope.getStarted = function () {
        $uibModalInstance.close();
      };

      $scope.signUp = function() {
        $uibModalInstance.close();
      }
    };
})();
