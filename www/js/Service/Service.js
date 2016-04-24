app.factory('fizxFactory', function ($rootScope) {

  /*hide subheader*/
  var data = {hideSubHeader:false};
  var setHide = function (value) {
    data.hideSubHeader = value;
  };
  var getHide = function () {
    return data.hideSubHeader
  };

  /*selected post*/
  var lastState = '';
  var post;
  var setPost = function (data,lasteState) {
    post = data;
    lastState = lasteState
  };
  var getPost = function(){
    return {
      post:post,
      lastState :lastState
    }
  };

  /*set post to local storage*/
  var setPostToLocalStorage = function(post){
    var storedPost = localStorage.getItem('posts');
    if(storedPost == null){
      var posts = [];
      posts.push(post);
      localStorage["posts"] = JSON.stringify(posts);
      console.log(JSON.parse(localStorage["posts"]));
      $rootScope.showToast('Your Bookmark saved successfully');
    }else{
      var checked = true;
      var posts= JSON.parse(localStorage["posts"]);
      for(var i = 0; i< posts.length;i++){
        if(post.ID == posts[i].ID){
          checked = false;
          $rootScope.showToast('This Bookmark is already saved');
          break
        }
      }
      if(checked){
        var id= JSON.parse(localStorage["posts"]);
        id.push(post);
        localStorage["posts"] = JSON.stringify(id);
        $rootScope.showToast('Your Bookmark saved successfully');
        console.log(JSON.parse(localStorage["posts"]));
      }
    }
  };

  return {
    getHide : getHide,
    setHide : setHide,
    data : data,
    setPost : setPost,
    getPost : getPost,
    setPostToLocalStorage : setPostToLocalStorage
  }

});
