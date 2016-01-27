var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', 'utils', function($scope, $http, utils){

  $scope.distance = {
    selectedOption : {id: '5 miles', value: '5mi'},
    options : [
      {id: '5 miles', value: '5mi'},
      {id: '10 miles', value: '10mi'},
      {id: '25 miles', value: '25mi'},
      {id: '50 miles', value: '50mi'}
      ]
    };

  $scope.backupImage = 'http://i.imgur.com/QCaDyJ9.png';

  $scope.checkboxData = {
    weekendOnly : false,
    popularOnly : false
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
  var getEvents = function(){

    var location = $scope.location,
        distance = $scope.distance.selectedOption.value,
        flags    = $scope.checkboxData,
        params   = utils.craftRequestParams(location, distance,flags);

    $http({
      method: 'GET',
      url: 'https://www.eventbriteapi.com/v3/events/search/',
      headers: {
        'Content-Type': 'application/json'
      },
      params : params
    }).then(function onSuccess(response){
      console.log(response);
      $scope.eventData = utils.processEventData(response.data.events);

    }, function onError(response) {
      console.log(response);
    });
  };

  $scope.fetchData = function(isValid) {
    if (isValid) {
      getEvents();
    }
  };

}]);