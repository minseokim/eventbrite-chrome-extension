var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){

  var input = document.getElementById('from');

  //Set up Google Maps Autocomplete API
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    var place = autocomplete.getPlace();
    var location = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
      address: place.formatted_address
    };
    // $scope.$apply();
    getEvents(location, '10mi');
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

}]);