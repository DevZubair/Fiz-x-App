app.controller("bookmarksCtrl",function($scope, fizxFactory, $timeout,$ionicTabsDelegate,$state){
  $scope.bookmarksArray = [];
  $scope.showBookmarks = false;
  $scope.showError = false;
  $scope.hideHeader = fizxFactory.data;
  function init(){
    var bookmarks = localStorage.getItem('posts');
    if(bookmarks){
      $scope.bookmarksArray = JSON.parse(localStorage["posts"]);
      $timeout(function(){
        $scope.showBookmarks = true;
      },2000)
    }else{
      $scope.showError = true;
    }
  }
  init();

  /*set selected post id*/
  $scope.bookmarksSelectedPost = function (post) {
    fizxFactory.setPost(post,$state.$current.self.name);
    $state.go('selectedPost');
  };

  $scope.goForward = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1) {
      $ionicTabsDelegate.select(selected + 1);
    }
  };

  $scope.goBack = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1 && selected != 0) {
      $ionicTabsDelegate.select(selected - 1);
    }
  };
})

  /*DATE formate changer*/
  .filter('cmdate', [
    '$filter', function($filter) {
      return function(input, format) {
        return $filter('date')(new Date(input), format);
      };
    }
  ]);
