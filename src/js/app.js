var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){

  var requestData = {

  };

  $http({
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search/',
    headers: {
      'Content-Type': 'application/json'
    },
    params : {
      token : 'M4BHIAPHJ2G4TS5NQFZH'
    },
    data : requestData
  }).then(function onSuccess(response){
    console.log(response);
  }, function onError(response) {

  });



}]);