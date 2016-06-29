blipWeatherApp.controller('weatherController', ['$scope','weatherService', function($scope, weatherService){
  function loadImage(description) {
    var images = {
      'Sunny': 'assets/images/sunny.png',
      'Mostly Sunny': 'assets/images/mostlySunny.png',
      'Partly Cloudy': 'assets/images/5.png',
      'Scattered Showers': 'assets/images/mostlySunny.png',
      'Thunderstorms': 'assets/images/mostlySunny.png',
      'Cloudy': 'assets/images/mostlySunny.png',
      'Scattered Thunderstorms': 'assets/images/mostlySunny.png',
      'Rain': 'assets/images/mostlySunny.png',
      'Breezy': 'assets/images/mostlySunny.png'
    };

    return images[description];
  }

  function dayOfTheWeek(index) {
    return ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][index];
  }

  function buildForecastElement(forecast) {
    return {
      day: dayOfTheWeek((new Date(forecast.data)).getDay()),
      temperature: {
        high: forecast.high,
        low: forecast.low
      },
      image: loadImage(forecast.text)
    }
  }

  $scope.submit = function() {
    $scope.errorLabel = null;

    if(!$scope.cityName) {
      $scope.errorLabel = 'Please fill the city!'
      return;
    }

    weatherService.getCityWeather($scope.cityName).then(function(forecast){
      if(!forecast.length) {
        $scope.errorLabel = 'City not found!'
        return;
      }

      $scope.forecast = forecast.slice(0,5).map(buildForecastElement);
    });
  }
}]);
