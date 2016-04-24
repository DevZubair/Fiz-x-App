app.controller("homeCtrl",function($scope, fizxFactory,$http,$timeout,$ionicTabsDelegate,$state,$ionicPopup,$cordovaToast,ionicToast){
  $scope.homeArray = [];
  $scope.homePageNo = 1;
  $scope.showHome = false;
  $scope.showLoadMore = true;
  $scope.showError = false;
  $scope.hideHeader = fizxFactory.data;
  function init(){
    var storedPosts = localStorage.getItem('posts');
    $http.get('http://www.fiz-x.com/wp-json/posts/?page=1').then(function (posts) {
      $scope.homeArray = posts.data;
      console.log(posts);
      if(storedPosts){
        var post = JSON.parse(storedPosts);
        for(var i=0;i<$scope.homeArray.length;i++){
          for(var j=0;j<post.length;j++){
            if(post[j].ID == $scope.homeArray[i].ID){
              $scope.homeArray[i].bookmarked = true;
            }
          }
        }
      }else{
        console.log('no posts bookmarked')
      }
      $timeout(function(){
        $scope.showHome = true;
      },3000);
    }, function (error) {
      console.log(error);
      $scope.showError = true;
    });
  }
  init();
  $scope.loadMoreHomePosts = function(){
    var storedPosts = localStorage.getItem('posts');
    $scope.showLoadMore = false;
    $scope.homePageNo = $scope.homePageNo+2;
    $http.get('http://www.fiz-x.com/wp-json/posts/?page='+$scope.homePageNo).then(function (posts) {
      if(storedPosts){
        var post = JSON.parse(storedPosts);
        for(var i=0;i<posts.data.length;i++){
          for(var j=0;j<post.length;j++){
            if(post[j].ID == posts.data[i].ID){
              posts.data[i].bookmarked = true;
            }
          }
        }
      }else{
        console.log('no posts bookmarked')
      }
      $scope.homeArray.push.apply($scope.homeArray, posts.data);
      $scope.showLoadMore = true;
    }, function (error) {
      console.log(error);
      $scope.showError = true;
      $scope.showLoadMore = true;
    })
  };

  /*set selected post id*/
  $scope.homeSelectedPostId = function (post) {
    fizxFactory.setPost(post,$state.$current.self.name);
    $state.go('selectedPost');
  };

  /*refresh when pull enough*/
  $scope.doRefresh = function(){
    console.log('pulled');
    $scope.showLoadMore = true;
    $scope.showHome = false;
    init();
    $scope.$broadcast('scroll.refreshComplete');
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
