/** attach controllers to this module 
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules 
 * which avails each controller of, for example, the `config` constants object.
 **/
define(['angular'], function (ng) {
	'use strict';
	var loginModule = ng.module('app.login', [
			'ui.router',
			'ui.bootstrap',
	]);
	loginModule.config(function config($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				controller: 'loginCtrl',
				templateUrl: 'app/login/login.tpl.html',
				authenticate: false
			});

	});

	loginModule.controller('loginCtrl', function($scope) {
		$scope.login = function() {
			$scope.alerts = [];
			var credentials = {
				"email": $scope.email,
				"password": $scope.password,
				"remember": Boolean($scope.remember)
			};
				$scope.alerts.push('sdfdsf');
		};


	});




});
