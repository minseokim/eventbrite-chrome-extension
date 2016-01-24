var myApp = angular.module('myApp', ['angularMoment']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){


  $scope.distance = {
    selectedOption : {id: '10', value: '10mi'},
    options : [
      {id: '10', value: '10mi'},
      {id: '25', value: '25mi'},
      {id: '50', value: '50mi'}
      ]
    };

  //Set up Google Maps Autocomplete API
  var input = document.getElementById('location');

  var autocomplete = new google.maps.places.Autocomplete(input);

  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    var place = autocomplete.getPlace();
    $scope.location = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
      address: place.formatted_address
    };
  });

  //Ajax request to fetch events from Eventbrite API
  var getEvents = function(location, range){
    var requestData = {
      token : '3URCTQMSNEBN7MEB3Z33',
      'location.latitude' : location.lat,
      'location.longitude' : location.lon,
      'location.within' : range
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
      console.log(response);
    });
  };

  //Angular Progress Bar Here
  $scope.fetchData = function(){
    getEvents($scope.location, $scope.distance.selectedOption.value);
  };

}]);