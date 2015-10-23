(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "events";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("EventsController", ['$scope', '$http', '$location', 'Events',
		function($scope, $http, $location, Events) {
			$scope.categories = [];
			Events.categories()
			.then(function(categories){
				$scope.categories = categories.category;
			});
		}]);

})();