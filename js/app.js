var myModule = angular.module('myApp', []);

myModule.factory('APIUtils', ['$http', '$q', function($http, $q){
   var utils={};
   var deferred = $q.defer();
   $http.defaults.headers.common.Accept = 'application/json';
   utils.sendRequest=function(url){
       $http.get(url)
       .then(function(data, status){
           $(".loader-div").hide();
           deferred.resolve(data);
       },function(data, status){
           $(".loader-div").hide();
           deferred.reject(status);
       });
       return deferred.promise;
   };
   return utils;
}]);


myModule.controller('myCtrl', ['$scope','APIUtils' ,function($scope, APIUtils) {
	$scope.slidesData = [];
  APIUtils.sendRequest('/json/slides.json').then(function(response){
		$scope.slidesData = response.data;
	});
  // $scope.displayBanner = function(slides){
  //   var l = slides.length;
  //   var start = 0;
  //   while(l > 0){
  //     setInterval
  //     if(start == l){
  //       start = 0;
  //     }
  //     $scope.bannerCaption = $scope.slidesData[start].banner_title;
  //     $scope.bannerText = $scope.slidesData[start].banner_text;
  //     start += 1; 
  //   }
  // }
}]);
