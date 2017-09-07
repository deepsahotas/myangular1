var myModule = angular.module('myApp', []);

myModule.factory('APIUtils', ['$http', '$q', function($http, $q){
   var utils={};
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
	APIUtils.sendRequest('../json/slides.json').then(function(data){
		$scope.slidesData = data;
	});
	$scope.bannerCaption = "Hongkong";
	$scope.bannerText = "Hongkong is the beautiful city";
}]);