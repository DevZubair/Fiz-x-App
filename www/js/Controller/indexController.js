app.directive('canDragMenu', function ($ionicGesture) {
  return {
    restrict: 'A',
    require: '^ionSideMenus',
    scope: true,
    link: function($scope, $element, $attr, sideMenuCtrl) {

      $ionicGesture.on('dragleft', function(e) {      //Closes the sidemenu

        sideMenuCtrl._handleDrag(e);
        e.gesture.srcEvent.preventDefault();
      }, $element);
      $ionicGesture.on('dragright', function(e) {     //Opens the sidemenu

        sideMenuCtrl._handleDrag(e);
        e.gesture.srcEvent.preventDefault();
      }, $element);
      $ionicGesture.on('release', function(e) {

        sideMenuCtrl._endDrag(e);
      }, $element);
    }
  }
});

app.controller("IndexCtrl",function($scope,$ionicSideMenuDelegate,$rootScope,$state){

  $scope.openMenu = false;
  $scope.runtime = 0;

  $rootScope.showMenu = function() {

    $ionicSideMenuDelegate.toggleRight();

  };
  $scope.uiRouterState = $state;
  $scope.screenWidth = window.screen.width;
  $scope.changeState = function (index) {
    if(index == 1){
      $state.go('tabs.home');
      //$ionicSideMenuDelegate.toggleRight();
    }
    else if(index == 2){
      $state.go('bookmarks');
      $ionicSideMenuDelegate.toggleRight();
    }else if(index == 5){
      $state.go('searchPage');
      $ionicSideMenuDelegate.toggleRight();
    }
  }
});
