app.controller("SearchCtrl",function($scope,$timeout,$ionicSideMenuDelegate,$rootScope,$http,fizxFactory){

  $scope.showSearch = false;
  $scope.showList = false;
  $scope.query = '';

  $rootScope.showMenu = function() {

    $ionicSideMenuDelegate.toggleRight();

  };
  $scope.clearSearch = function () {
    $scope.query = '';

  };
  $scope.search = function () {
    var storedPosts = localStorage.getItem('posts');
    $scope.showList = false;
    $scope.showSearch = true;
    $http.get('http://www.fiz-x.com/wp-json/posts/?filter[s]=' + $scope.query).then(function (posts) {
      console.log(posts);
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
      $scope.items = [];
      $scope.items = $scope.items.concat(posts.data);
      $timeout(function(){
        $scope.showSearch = false;
        $scope.showList = true;
      },3000);
    }, function (error) {
      console.log(error);
    })
  };
  $scope.searchSelectedPostId = function (post) {
    fizxFactory.setPost(post,$state.$current.self.name);
    $state.go('selectedPost');
  }
});
