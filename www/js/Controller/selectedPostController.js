app.controller("selectedPostCtrl",
  function ($scope, fizxFactory, $ionicTabsDelegate, $ionicModal, $cordovaSocialSharing,$cordovaInAppBrowser,$state,$rootScope) {
    $scope.returnedObj =fizxFactory.getPost();
    $scope.selectPost = $scope.returnedObj.post;
    console.log($scope.selectPost);
    $scope.showSelectedPost = false;
    $scope.hideHeader = fizxFactory.data;
    function init() {
      $scope.myModel = {
        Url: $scope.selectPost.link,
        Name: $scope.selectPost.title,
        ImageUrl: $scope.selectPost.featured_image.guid
      };
      $scope.showSelectedPost = true;
    }

    init();
    $scope.commentOn = function () {
      console.log('in comment');
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
    /*modal*/
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });

    /*correct social media sharing*/
    //$scope.shareViaFacebook = function (message, image, link) {
    $scope.shareViaFacebook = function () {
      /*$cordovaSocialSharing.canShareVia("facebook", message, image, link).then(function (result) {
        console.log(result);
        var str = $scope.selectPost.title;
        var replaced = str.split(' ').join('+');
        var facebookLink = $scope.selectPost.link;
        $cordovaSocialSharing.shareViaFacebook(message, image, facebookLink);
      }, function (error) {
        console.log(error);
        alert("You do not have Facebook installed");
      });*/
      var defaultOptions = {
        location: 'no',
        clearcache: 'no',
        toolbar: 'yes'
      };
      /*var ref = cordova.InAppBrowser.open(url, '_blank',defaultOptions);*/
      var replaced = $scope.selectPost.title.split(' ').join('+');
      var url = 'http://www.facebook.com/sharer/sharer.php?u='+$scope.selectPost.link+'&t='+replaced
      window.new_window = window.open(url, '_blank', 'location=no,closebuttoncaption=close');
      window.new_window.addEventListener('loadstop', function(event) {
        var urlSuccessPage = url;
        if (event.url == 'https://www.facebook.com/dialog/return/close?#_=_') {
          window.new_window.close();
        }
      });
      /*$cordovaInAppBrowser.open(url, '_blank', defaultOptions)
        .then(function(event) {
          // success
          console.log('success')
        })
        .catch(function(event) {
          // error
          console.log('error')
        });
      $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
        console.log('closed');
      });*/
    };
    $scope.shareViaTwitter = function (message, image, link) {
      $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function (result) {
        console.log(result);
        var str = $scope.selectPost.title;
        var replaced = str.split(' ').join('+');
        var twitter = $scope.selectPost.link;
        $cordovaSocialSharing.shareViaTwitter(message, image, twitter);
      }, function (error) {
        console.log(error);
        alert("You do not have Twitter application installed");
      });
    };
    $scope.shareViaGooglePlus = function (message, image, link) {
      $cordovaSocialSharing.share("This is your message", $scope.selectPost.featured_image.guid, $scope.selectPost.link);
    };
    $scope.shareViaPinterest = function (message, image, link) {
      $cordovaSocialSharing.share("This is your message", $scope.selectPost.featured_image.guid, $scope.selectPost.link);
    };

    /*save post*/
    $scope.savePost = function() {
      fizxFactory.setPostToLocalStorage($scope.selectPost);
    }
    !function(t,e,n){
      function a(t){
        var a=e.createElement("script");
        a.type="text/javascript",
          a.async=!0,
          a.src=("https:"===e.location.protocol?"https":"http")+":"+n,(t||e.body||e.head).appendChild(a)}
      function o(){
        var t=e.getElementsByTagName("script"),
          n=t[t.length-1];
        return n.parentNode}
      var p=o();
      t.spotId="sp_3eEnE2Vq",
        t.parentElement=p,
        a(p)}(window.SPOTIM={},document,"//www.spot.im/launcher/bundle.js");

    /*back button*/
    $scope.goToLastState = function(){
      $state.go($scope.returnedObj.lastState)
    }

  });
