angular.module('zoomSeach')
.factory('bookingDetails', ['$resource', function($resource) {
    var details = $resource('http://suprabha.me/car-data.json');
    return details;
}]);