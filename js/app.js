
var services = angular.module('myServices', []);

services.factory('APIUtils', ['$http', '$q', function($http, $q){
   var utils={};
   $http.defaults.headers.common.Accept = 'application/json';
   utils.sendRequest=function(url){
        var deferred = $q.defer();
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


var myModule = angular.module('myApp', ['myServices', 'ngRoute']);

myModule.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html"
    })
    .when("/about", {
        templateUrl : "views/about.html"
    })
    .when("/services", {
        templateUrl : "views/services.html"
    })
    .when("/contact", {
        templateUrl : "views/contact.html"
    })
    .when("/products", {
        templateUrl : "views/products.html"
    })
    .when("/view1", {
        templateUrl : "views/view-1-col.html"
    })
    .when("/view2", {
        templateUrl : "views/view-2-col.html"
    })
    .when("/view4", {
        templateUrl : "views/view-4-col.html"
    })
    .when("/blog", {
        templateUrl : "views/blog.html"
    });
});

myModule.controller('myCtrl', ['$scope','APIUtils' ,function($scope, APIUtils) {
	$scope.slidesData = [];
  $scope.productData = [];
  $scope.portfolioData = [];
  $scope.featureData = [];
  $scope.aboutData = [];
  APIUtils.sendRequest('/json/slides.json').then(function(response){
		$scope.slidesData = response.data;
    $scope.firstThreebanner = $scope.slidesData.splice(1, 3);
    $scope.serviceBanner = $scope.slidesData[Math.floor(Math.random() * $scope.slidesData.length)].banner_url;
	});
  APIUtils.sendRequest('/json/product.json').then(function(response){
    $scope.productData = response.data;
    $scope.firstThree = $scope.productData.splice(1, 3);
  });
  APIUtils.sendRequest('/json/portfolio.json').then(function(response){
    $scope.portfolioData = response.data;
    $scope.portfolioSix = $scope.portfolioData.splice(2,6);
    $scope.featureImg = $scope.portfolioData[Math.floor(Math.random() * $scope.portfolioData.length)].portfolio_url;
  });
  APIUtils.sendRequest('/json/feature.json').then(function(response){
    $scope.featureData = response.data;
    $scope.featureContent = $scope.featureData[Math.floor(Math.random() * $scope.featureData.length)].feature_content;
  });
  APIUtils.sendRequest('/json/aboutpage.json').then(function(response){
    $scope.aboutData = response.data;
    $scope.aboutImg = $scope.aboutData[Math.floor(Math.random() * $scope.aboutData.length)].about_img;
    $scope.aboutContent = $scope.aboutData[0].about_content;
    $scope.teamContent = $scope.aboutData.splice(1,3);
    $scope.customerImage = $scope.aboutData.splice(1,6);
  });
}]);
