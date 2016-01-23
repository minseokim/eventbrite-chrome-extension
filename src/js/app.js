var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){


  var requestData = {
    token : '3URCTQMSNEBN7MEB3Z33',
    'location.latitude' : '37.780125',
    'location.longitude' : '-122.404190',
    'location.within' : '10mi'
  };

  $http({
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search/',
    headers: {
      'Content-Type': 'application/json'
    },
    params : requestData
  }).then(function onSuccess(response){
    console.log(response);
  }, function onError(response) {

  });



}]);