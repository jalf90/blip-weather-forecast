blipWeatherApp.filter('fahrenheitToCelcius', function () {
  return function fahrenheitToCelcius(fahrenheit) {
    return Math.trunc((5/9) * (fahrenheit-32)) + 'º C';
  }
});
