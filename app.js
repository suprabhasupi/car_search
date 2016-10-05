var app = angular.module('zoomSeach', ['ngMaterial', 'ngResource'])
    .controller('searchCtrl', ['$scope','$timeout', 'bookingDetails', function($scope, $timeout, bookingDetails) {
        $scope.happy = "Supi";
        $scope.distance = 3;
        $scope.all = 'all';
        $scope.selectedType = 'all';
        $scope.result = false;
        $scope.message="Find your car";
        $scope.myDate = new Date();
        $scope.today = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth(),
            $scope.myDate.getDate());

        $scope.nextDay = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth(),
            $scope.myDate.getDate());
        var cars;
        var getCarType = function(carData) {
            var carType = [];
            console.log(carData.length)
            for (var i = 0; i < carData.length; i++) {
                if (carType.indexOf(carData[i].type) < 0) {
                    carType.push(carData[i].type)
                }
            }
            console.log("CAR TYPE => ", carType);
            return carType;
        }

        var dateToEpoch = function(date) {
            console.log(date.getFullYear())
            console.log(date.getMonth())
            console.log(date.getDate())
            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        }
        $scope.select = function(index){
            console.log("SELECTED is CLICKED")
            $scope.selectedIndex = index;
        }
        $scope.search = function() {
            $scope.message = "loading...";
            var x = bookingDetails.query(function(data) {
                var startDateEpoch = dateToEpoch($scope.startDate);
                var endDateEpoch = dateToEpoch($scope.endDate);
                var hours = Math.abs($scope.startDate - $scope.endDate) / 36e5;
                console.log("HOURS => ", hours);
                var availableCar = [];
                $scope.result = true;
                console.log("X Data => ", JSON.parse(angular.toJson(data)));
                cars = JSON.parse(angular.toJson(data));
                $scope.carlist = cars;
                $scope.carType = getCarType($scope.carlist);
                angular.forEach($scope.carlist, function(car) {
                    if (!(startDateEpoch > car.availability.startDate && endDateEpoch < car.availability.endDate && $scope.distance >= car.distanceKMS)) {
                        console.log("Removing car");
                    } else {
                        console.log("ELSE Condition", car.pricePerHour);
                        car.rent = hours * car.pricePerHour;
                        availableCar.push(car);
                    }
                })
                $scope.carlist = availableCar;
                $timeout(function(){$scope.message = "No result fonund :("}, 3000);
            })
        }

        $scope.$watch('startDate', function(nv) {
            // $scope.myDate = nv;
            console.log("nv=>", nv);
            if(nv){
            $scope.nextDay = new Date(
                nv.getFullYear(),
                nv.getMonth(),
                nv.getDate()+1);
        }
        })

        $scope.typeFilter = function(carlist) {
            if ($scope.selectedType == 'all') {
                return (carlist);
            }
            return ($scope.selectedType === carlist.type);
        }


    }]);
