angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GameCtrl', function($scope, MotionReader, $timeout, $interval, Settings) {
  $scope.tesselationAPI = {};
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  var velocity = {
    x: 0,
    y: 0
  }
  var update;

  MotionReader.startWatcher();

  var setUpdateInterval = function () {
      update = $interval(function () {
      var velocity = MotionReader.value;

      x = (x - velocity.x * Settings.acceleration.speed) % window.innerWidth;
      y = (y + velocity.y * Settings.acceleration.speed) % window.innerHeight;

      if (x < 0 ) {
        x = window.innerWidth;
      }

      if (y < 0) {
        y = window.innerHeight;
      }

      $scope.tesselationAPI.updatePointer(x,y);
    }, 33);
  }


  $timeout(function() {
    setUpdateInterval();
  }, 500);

  $scope.$on('$destroy', function() {
    if (angular.isDefined(update)) {
      $interval.cancel(update);
    }
  })
});

