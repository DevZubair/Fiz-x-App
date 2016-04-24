// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'jett.ionic.scroll.sista','ngCordova','angulike', 'ionic-toast'])

  .run(function ($ionicPlatform, $q, $http, $rootScope, $location, $window, $timeout,fizxFactory,ionicToast) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      /*save post*/
      $rootScope.savePostFromRoot = function(posst) {
        fizxFactory.setPostToLocalStorage(posst);
      };
      $rootScope.showToast = function(message){
        <!-- ionicToast.show(message, position, stick, time); -->
        ionicToast.show(message, 'bottom', false, 2500);
      };
    });
  });
app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  // $ionicConfigProvider.tabs.position('top');

  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/slidingContent.html',
      controller : "SlidingCtrl"
    })
    .state('tabs.home', {
      url: "/home",
      cache : true,
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller : "homeCtrl"
        }
      }
    })
    .state('tabs.humor', {
      url: "/humor",
      cache : true,
      views: {
        'home-tab': {
          templateUrl: "templates/humor.html",
          controller : "humorCtrl"
        }
      }
    })
    .state('tabs.movies', {
      url: "/movies",
      cache : true,
      views: {
        'home-tab': {
          templateUrl: "templates/movies.html",
          controller : "moviesCtrl"
        }
      }
    })
    .state('tabs.entertainment', {
      url: "/entertainment",
      views: {
        'home-tab': {
          templateUrl: "templates/entertainment.html",
          controller : "entertainmentCtrl"
        }
      }
    })
    .state('tabs.geekArt', {
      url: "/geekArt",
      views: {
        'home-tab': {
          templateUrl: "templates/geekArt.html",
          controller : "geekArtCtrl"
        }
      }
    })
    .state('tabs.gadgets', {
      url: "/gadgets",
      views: {
        'home-tab': {
          templateUrl: "templates/gadgets.html",
          controller : "gadgetsCtrl"
        }
      }
    })
    .state('tabs.games', {
      url: "/games",
      views: {
        'home-tab': {
          templateUrl: "templates/games.html",
          controller : "gamesCtrl"
        }
      }
    })
    .state('tabs.photography', {
      url: "/photography",
      views: {
        'home-tab': {
          templateUrl: "templates/photography.html",
          controller : "photographyCtrl"
        }
      }
    })
    .state('tabs.news', {
      url: "/news",
      views: {
        'home-tab': {
          templateUrl: "templates/news.html",
          controller : "newsCtrl"
        }
      }
    })
    .state('selectedPost', {
      url: '/selectedPost',
      templateUrl: 'templates/selectedPost.html',
      controller : "selectedPostCtrl",
      cache : false
    })
    .state('searchPage', {
      url: '/search',
      templateUrl: 'templates/searchPage.html',
      controller : "SearchCtrl",
      cache : true
    })
    .state('bookmarks', {
      url: '/bookmarks',
      templateUrl: 'templates/bookmarks.html',
      controller : 'bookmarksCtrl',
      cache : false
    });

  $urlRouterProvider.otherwise("/tab/home");
});

