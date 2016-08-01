exports.applicationController = function($scope, $routeParams, $http, Applications) {
    $scope.addApplication = function(){
        if(!$scope.appName || $scope.appName.length < 1) return;
        var application = new Applications({ name: $scope.appName, description: $scope.appDescription });
        Applications.save (application, function(application){
          size= $scope.applications.push(application);
          $scope.message= "application added";
          $scope.appName = ''; // clear textbox
          $scope.appDescription = ''; // clear textbox

        }, function(error){
          $scope.message= "application already exist!";
          $scope.appName = ''; // clear textbox
          $scope.appDescription = ''; // clear textbox
        });
    };


    $scope.applications = Applications.query(function(){
        console.log("ApplicationCtrl")
    });

  setTimeout(function() {
    $scope.$emit('applicationController');
  }, 0);
};

exports.deploymentController = function($scope, $routeParams, $http) {
  var encoded = encodeURIComponent($routeParams.env);
  $http.
    get('/deployments/?application=' + encoded).
    success(function(data) {
      $scope.deployment = data;
    });

  setTimeout(function() {
    $scope.$emit('deploymentController');
  }, 0);
};

exports.buildController = function($scope, $routeParams, $http) {
  var encoded = encodeURIComponent($routeParams.application);
  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $http.
    get('/builds/?application=' + encoded).
    success(function(data) {
      $scope.builds = data;
      $scope.application=$routeParams.application;
      $scope.propertyName = 'created_at';
      $scope.reverse = true;

    });
  setTimeout(function() {
    $scope.$emit('buildController');
  }, 0);
};
