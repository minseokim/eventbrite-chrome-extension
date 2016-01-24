var myApp = angular.module('myApp', []);

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



  //Get current date of user
  var handleDates = (function(){
    //start_date.range_start  Only return events with start dates after the given UTC date.
    //start_date.range_end  Only return events with start dates before the given UTC date.

    var isoString = moment().toISOString();

    var dateRange = {
      start : null,
      end : null
    };

    //Find the nearest Friday from today
      //set that as the start limit filter
        //use a loop that goes from today till 7 days from now

     var days = 1;
     var today = moment();

     while (days <= 7) {

      if (today.format('dddd') === 'Friday') {
          console.log('found friday');
          dateRange.start = today;
          break;
       }

      today.add(1, 'days').format('dddd');
      days++;
     }

     dateRange.end = dateRange.start.clone().add(2, 'days');

     dateRange.start = dateRange.start.toISOString();
     dateRange.end = dateRange.end.toISOString();
     console.log(dateRange);
  })();


  //Ajax request to fetch events from Eventbrite API
  var getEvents = function(location, distance, dates){

    var requestData = {
      token : '3URCTQMSNEBN7MEB3Z33',
      'location.latitude' : location.lat,
      'location.longitude' : location.lon,
      'location.within' : distance
    };

    if (dates) {
      requestData[start_date.range_start] = dates.start;
      requestData[start_date.range_end] = dates.end;
    }

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
    getEvents($scope.location, $scope.distance.selectedOption.value, dateRange);
  };
}]);