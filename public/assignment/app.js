(function(){

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(myFormApp.applicationModuleName).requires.push(moduleName);
	};

	//Defining our app configs, cann add some more attributes to it later on as we progress
	var myFormApp = {
		applicationModuleName: "FormBuilderApp",
		applicationModuleVendorDependencies: ['ngRoute'],//['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'],
		registerModule: registerModule
	};

	window.myFormApp = myFormApp;

	//Declaring our root module
	angular.module(myFormApp.applicationModuleName,myFormApp.applicationModuleVendorDependencies);

	// Setting HTML5 Location Mode
	angular.module(myFormApp.applicationModuleName).config(['$locationProvider',
		function($locationProvider) {
			console.log("hello, hash prefixed");
			$locationProvider.hashPrefix('!');
		}
		]);

	//Creating "HelloWorldController" controller -> normally create a separate files for controller
	angular
	.module(myFormApp.applicationModuleName)
	.config(MyAppFunction)
	.controller("HelloWorldController", HelloWorldController);

	function MyAppFunction($routeProvider){
		$routeProvider
		.when("/", {
			templateUrl : "index.html" 
		})
		.otherwise({
			redirectTo : "/" 
		})
	};

	function HelloWorldController($scope){

		$scope.hello = "Hello Jainam..!!";

		$scope.courseName = "WebDev CS5610";

		$scope.user = {
			fname : "jnam",
			lname : "shah"
		};
	};

})();