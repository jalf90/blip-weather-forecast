blipWeatherApp.service('weatherService', ['$http', '$q', function($http, $q){
  var YAHOO_WEATHER_API = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
  var cache = {};

  function canMakeTheRequest(cityName) {
    if(!cache[cityName]) {
      return true;
    }

    var HOUR = 3600000;
    var currentTime = new Date();
    var lastRequestTime = cache[cityName].created;

    return (currentTime - lastRequestTime) > HOUR;
  }

  return {
    getCityWeather : function(cityName) {
      if(!cityName) {
        return $q.resolve([]);
      }

      cityName = cityName.toUpperCase();

      if(canMakeTheRequest(cityName)) {
        var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + cityName + "')";
        var request = YAHOO_WEATHER_API + query;
        var yahooPromise = $http.get(request);

        return yahooPromise.then(function success(response) {
          if(!response.data.query.results) {
            return [];
          }

          cache[cityName] = response.data.query;

          return response.data.query.results.channel.item.forecast;
        });
      }

      return $q.resolve(cache[cityName].results.channel.item.forecast);
    }
  }
}]);
