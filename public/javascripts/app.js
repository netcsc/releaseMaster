var app = angular.module('release-master', ['ng', 'ngRoute', 'ngResource','ui.bootstrap']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      template: '<application></application>'
    }).
    when('/builds/:application/:page?', {
      template: '<build></build>'
    }).
    when('/deploy/:application/:build', {
      template: '<deploy></deploy>'
    }).
    when('/deployment/:application', {
      template: '<deployment></deployment>'
    });
});
