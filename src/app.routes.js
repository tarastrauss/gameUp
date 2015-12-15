(function() {
  "use strict";

  angular
    .module("gameUpApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("landingPage", {
        url: "/",
        templateUrl: "/templates/landing.html",
        controller: "MainController",
        controllerAs: "vm"
      })
      .state("profilePage", {
        url: "/profile",
        templateUrl:  "/templates/profile.html"
      })
      .state("gamePage", {
        url: "/game",
        templateUrl: "/templates/game.html",
        controller: "GameController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
