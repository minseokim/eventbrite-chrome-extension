angular.module('myApp')

  .factory('utils', function(){

  /*getNextWeekend() gets the start and end dates for nearest weekend using moment.js
    Returns the weekend dates in ISOString format
    @return {weekendDates}
  */
  var getNextWeekend = function(){

    var weekendDates = {
      start : null,
      end : null
    };

    /*Starting from today, find the closest Friday and set that as start date of weekend
      add two days to it to set end date of weekend
    */
     var days = 1;
     var today = moment().utc();

     while (days <= 7) {
      if (today.format('dddd') === 'Friday') {
          weekendDates.start = today;
          break;
       }
      today.add(1, 'days').format('dddd');
      days++;
     }
     weekendDates.end = weekendDates.start.clone().add(2, 'days');

    /*Slice the strings from moment.js to match eventbrite's datatype format
          Moment.js format :       "2016-01-31T04:47:00.671Z"
      Eventbrite datatype format : "2010-01-31T13:00:00Z" */
     weekendDates.start = weekendDates.start.toISOString().slice(0, 19) + 'Z';
     weekendDates.end = weekendDates.end.toISOString().slice(0, 19) + 'Z';

     return weekendDates;
  };

  //processEventData() receives events data from API, maps it to format we want and returns it
  var processEventData = function(events){
          /* Data we need :
          - Title
          - URL
          - Start Date
          - logo
        */
      //events.categoryid,  events.logo.url,  events.name.text,
      //events.start.local, events.end.local, events.url

      return events.map(function(event) {
        return {
          categoryid: event.category_id,
          logo: event.logo,
          title : event.name.text,
          startDate : moment(event.start.local).format("dddd, MMM Do"),
          endDate : moment(event.end.local).format("dddd, MMM Do"),
          url : event.url
        };
      });
  };

  /*craftRequestParams() takes location, distance and flags as input, constructs appropriate
    request parameters and returns it
  */
  var craftRequestParams = function(location, distance, flags){

    var requestData = {
      token : '3URCTQMSNEBN7MEB3Z33',
      'location.latitude' : location.lat,
      'location.longitude' : location.lon,
      'location.within' : distance,
      'sort_by' :'date'
    };

    if (flags.weekendOnly) {
      var dateRange = getNextWeekend();
      requestData['start_date.range_start'] = dateRange.start;
      requestData['start_date.range_end'] = dateRange.end;
    }

    if (flags.popularOnly) {
      requestData.popular = true;
    }
    return requestData;
  };

  return {
    processEventData: processEventData,
    craftRequestParams: craftRequestParams
    };

  });