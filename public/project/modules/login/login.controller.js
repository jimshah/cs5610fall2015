(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "login";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("LoginController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 
		function($scope, $rootScope, $location, $window, UserService) {
			$scope.success= $scope.error = "";
			$scope.user = {
				email: "",
				password: ""
			};

			//Login Button navigating to #/profile
			$scope.login = function(){
				if ($scope.user.email && $scope.user.password){
					//Scope error make null
					$scope.error = null;
					UserService.findUserByEmail($scope.user.email, function(error, user){
						if (error){
							$scope.error = error;
						} else {
							//update rootscope user 
							$scope.user = $rootScope.user = user;
							//broadcast login auth event for listeners to update loggedin user 
							$rootScope.$broadcast('auth', user);
							//Navigate to profile
							$location.path( "/home" );
						}
					});
				}
			};


		}
		]);

})();