angular.module('myApp')

  .factory('utils', function(){

  //Get current date of user
  var getNextWeekend = function(){
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
     var today = moment().utc();

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

     return dateRange;
    // "2016-01-31T04:47:00.671Z"
    // "2010-01-31T13:00:00Z"
  };

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
          startDate : moment(event.start.local).format("MMM Do YY"),
          endDate : moment(event.end.local).format("MMM Do YY"),
          url : event.url
        };
      });
  };

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