app.controller("entertainmentCtrl",function($scope, fizxFactory,$http,$timeout,$ionicTabsDelegate,$state){
  $scope.entertainmentArray = [];
  $scope.entertainmentPageNo = 1;
  $scope.showEntertainment = false;
  $scope.showLoadMore = true;
  $scope.showError = false;
  $scope.hideHeader = fizxFactory.data;
  function init(){
    var storedPosts = localStorage.getItem('posts');
    $http.get('http://www.fiz-x.com/wp-json/posts/?filter[category_name]=Entertainment').then(function (posts) {
      $scope.entertainmentArray= posts.data;
      if(storedPosts){
        var post = JSON.parse(storedPosts);
        for(var i=0;i<$scope.entertainmentArray.length;i++){
          for(var j=0;j<post.length;j++){
            if(post[j].ID == $scope.entertainmentArray[i].ID){
              $scope.entertainmentArray[i].bookmarked = true;
            }
          }
        }
      }else{
        console.log('no posts bookmarked')
      }
      $timeout(function(){
        $scope.showEntertainment= true;
      },3000);
    }, function (error) {
      console.log(error);
      $scope.showError = true;
    })
  }
  init();
  $scope.loadMoreEntertainmentPosts = function(){
    var storedPosts = localStorage.getItem('posts');
    $scope.showLoadMore = false;
    $scope.entertainmentPageNo = $scope.entertainmentPageNo+1;
    $http.get('http://www.fiz-x.com/wp-json/posts/?filter[category_name]=Entertainment&&page='+$scope.entertainmentPageNo).then(function (posts) {
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
      $scope.entertainmentArray.push.apply($scope.entertainmentArray, posts.data);
      $scope.showLoadMore = true;
    }, function (error) {
      console.log(error);
      $scope.showError = true;
      $scope.showLoadMore = true;
    })
  };

  /*set selected post id*/
  $scope.entertainmentSelectedPost = function (post) {
    fizxFactory.setPost(post,$state.$current.self.name);
    $state.go('selectedPost');
  };

  /*refresh when pull enough*/
  $scope.doRefresh = function(){
    console.log('pulled');
    $scope.showLoadMore = true;
    $scope.showEntertainment= false;
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
