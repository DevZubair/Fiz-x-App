app.controller("moviesCtrl",function($scope, fizxFactory,$http,$timeout,$ionicTabsDelegate,$state){
  $scope.moviesArray = [];
  $scope.moviePageNo = 1;
  $scope.showMovies = false;
  $scope.showLoadMore = true;
  $scope.showError = false;
  $scope.hideHeader = fizxFactory.data;
  function init(){
    var storedPosts = localStorage.getItem('posts');
    $http.get('http://www.fiz-x.com/wp-json/posts/?filter[category_name]=Movies').then(function (posts) {
      $scope.moviesArray= posts.data;
      if(storedPosts){
        var post = JSON.parse(storedPosts);
        for(var i=0;i<$scope.moviesArray.length;i++){
          for(var j=0;j<post.length;j++){
            if(post[j].ID == $scope.moviesArray[i].ID){
              $scope.moviesArray[i].bookmarked = true;
            }
          }
        }
      }else{
        console.log('no posts bookmarked')
      }
      $timeout(function(){
        $scope.showMovies = true;
      },2000);
    }, function (error) {
      console.log(error);
      $scope.showError = true;
    })
  }
  init();
  $scope.loadMoreMoviePosts = function(){
    var storedPosts = localStorage.getItem('posts');
    $scope.showLoadMore = false;
    $scope.moviePageNo  = $scope.moviePageNo +1;
    $http.get('http://www.fiz-x.com/wp-json/posts/?filter[category_name]=Movies&&page='+$scope.moviePageNo).then(function (posts) {
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
      $scope.moviesArray.push.apply($scope.moviesArray, posts.data);
      $scope.showLoadMore = true;
    }, function (error) {
      console.log(error);
      $scope.showError = true;
      $scope.showLoadMore = true;
    })
  };

  /*set selected post id*/
  $scope.movieSelectedPost = function (post) {
    fizxFactory.setPost(post,$state.$current.self.name);
    $state.go('selectedPost');
  };

  /*refresh when pull enough*/
  $scope.doRefresh = function(){
    console.log('pulled');
    $scope.showLoadMore = true;
    $scope.showMovies= false;
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
