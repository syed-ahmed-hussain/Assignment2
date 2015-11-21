
function setClock(){  
    setInterval( function() {
		var seconds = new Date().getSeconds();
		var mins = new Date().getMinutes();
		var hours = new Date().getHours();
        
        var sec_angle = seconds * 6;
		document.getElementById("sec").style.transform = "rotate(" + sec_angle + "deg)";
		document.getElementById("bigsec").style.transform = "rotate(" + sec_angle + "deg)";
				
        var min_angle = mins * 6;
		document.getElementById("min").style.transform = "rotate(" + min_angle + "deg)";
		document.getElementById("bigmin").style.transform = "rotate(" + min_angle + "deg)";
				
        var hour_angle = hours * 30 + (mins / 2);
		document.getElementById("hour").style.transform = "rotate(" + hour_angle + "deg)";
		document.getElementById("bighour").style.transform = "rotate(" + hour_angle + "deg)";
    }, 1000 );
}

function setCalendar(currmonth,curryear){
	var maxdays = new Date(curryear, currmonth + 1, 0).getDate();
	var firstday = new Date(curryear, currmonth, 1).getDay();
	var calendar = new Array();
	
	for(var i = 0; i < firstday; i++) {	
		calendar.push("");	
	}
	
	for(var i = 1; i <= maxdays; i++) {	
		calendar.push(i);	
	}
	
	return calendar;
}

function closeit(option){
	if(option==1){
		document.getElementById("bigcalendar").style.display = "none";
	}
	else if(option==2){
		document.getElementById("bigclock").style.display = "none";
	}
	else if(option==3){
		document.getElementById("bigweather").style.display = "none";
	}
	document.getElementById("head").style.display = "block";
	document.getElementById("main").style.display = "block";
}

function openit(option){	
	document.getElementById("head").style.display = "none";
	document.getElementById("main").style.display = "none";

	if(option==1){
		document.getElementById("bigclock").style.display = "block";
		
	}
	else if(option==2){
		document.getElementById("bigcalendar").style.display = "block";
	}
	else if(option==3){
		document.getElementById("bigweather").style.display = "block";
	}
}

var app = angular.module('MyApp', []);
app.controller('CalendarController', function($scope) {
	$scope.currentdate = new Date();
	$scope.months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	$scope.month = $scope.currentdate.getMonth();
	$scope.year = $scope.currentdate.getFullYear();
	$scope.header =	$scope.months[$scope.month] + ' ' + $scope.year;
	$scope.arr = setCalendar($scope.month,$scope.year);
	
	$scope.back = function() {  
		$scope.month = $scope.month - 1;
		if($scope.month  < 0){
			$scope.month = $scope.month + 12;
			$scope.year = $scope.year - 1;
		}
		$scope.header =	$scope.months[$scope.month] + ' ' + $scope.year;
		$scope.arr = setCalendar($scope.month, $scope.year);
	}
	$scope.next = function() {  
		$scope.month = $scope.month + 1;
		if($scope.month  > 11){
			$scope.month = 0;
			$scope.year = $scope.year + 1;
		}
		$scope.header =	$scope.months[$scope.month] + ' ' + $scope.year;
		$scope.arr = setCalendar($scope.month, $scope.year);
	}
		
});
app.controller('WeatherController', function($scope, $http) {
	$http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(2211027)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
	.success(function(response) {
	$scope.weather = response.query.results.channel.item;
	});
});