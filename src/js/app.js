var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){

  $scope.distance = {
    selectedOption : {id: '5 miles', value: '5mi'},
    options : [
      {id: '5 miles', value: '5mi'},
      {id: '10 miles', value: '10mi'},
      {id: '25 miles', value: '25mi'},
      {id: '50 miles', value: '50mi'}
      ]
    };

  $scope.backupImage = 'http://i.imgur.com/i7aMrr9.jpg';

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
          dateRange.start = today;
          break;
       }
      today.add(1, 'days').format('dddd');
      days++;
     }

     dateRange.end = dateRange.start.clone().add(2, 'days');

     dateRange.start = dateRange.start.toISOString().slice(0, 19) + 'Z';
     dateRange.end = dateRange.end.toISOString().slice(0, 19) + 'Z';

     $scope.dateRange = dateRange;
    // "2016-01-31T04:47:00.671Z"
    // "2010-01-31T13:00:00Z"
  })();


  //Ajax request to fetch events from Eventbrite API
  var getEvents = function(location, distance, dates){

    var requestData = {
      token : '3URCTQMSNEBN7MEB3Z33',
      'location.latitude' : location.lat,
      'location.longitude' : location.lon,
      'location.within' : distance,
      'sort_by' :'date'
    };

    if (dates) {
      requestData['start_date.range_start'] = dates.start;
      requestData['start_date.range_end'] = dates.end;
    }

    $http({
      method: 'GET',
      url: 'https://www.eventbriteapi.com/v3/events/search/',
      headers: {
        'Content-Type': 'application/json'
      },
      params : requestData
    }).then(function onSuccess(response){
      // console.log(response);
      /* Data we need :
          - Title
          - URL
          - Start Date
          - logo
          - category(possibly)
      */
      //events.categoryid,  events.logo.url,  events.name.text,
      //events.start.local, events.end.local, events.url

      var eventData = response.data.events.map(function(event) {
        return {
          categoryid: event.category_id,
          logo: event.logo,
          title : event.name.text,
          startDate : moment(event.start.local).format("MMM Do YY"),
          endDate : moment(event.end.local).format("MMM Do YY"),
          url : event.url
        };
      });

      $scope.eventData = eventData;
      console.log(eventData);

    }, function onError(response) {
      console.log(response);
    });
  };

  //Angular Progress Bar Here
  $scope.fetchData = function(){
    getEvents($scope.location, $scope.distance.selectedOption.value, $scope.dateRange);
  };

}]);