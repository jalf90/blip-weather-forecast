blipWeatherApp.controller('weatherController', ['$scope','weatherService', function($scope, weatherService){
  function loadImage(description) {
    var images = {
      'Sunny': 'assets/images/sunny.png',
      'Partly Sunny': 'assets/images/partlySunny.png',
      'Mostly Sunny': 'assets/images/mostlySunny.png',
      'Cloudy': 'assets/images/cloudy.png',
      'Partly Cloudy': 'assets/images/partlyCloudy.png',
      'Mostly Cloudy': 'assets/images/mostlyCloudy.png',
      'Scattered Showers': 'assets/images/scatteredShowers.png',
      'Thunderstorms': 'assets/images/thunderstorms.png',
      'Scattered Thunderstorms': 'assets/images/scatteredThunderstorms.png',
      'Rain': 'assets/images/rain.png',
      'Breezy': 'assets/images/breezy.png'
    };

    return images[description];
  }

  function dayOfTheWeek(index) {
    return ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][index];
  }

  function buildForecastElement(forecast) {
    return {
      day: dayOfTheWeek((new Date(forecast.date)).getDay()),
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
