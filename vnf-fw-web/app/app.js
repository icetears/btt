/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
		'angular',
		'uiRouter',
		'uiBootstrap',
		'login/login'
], function (ng) {
	'use strict';

	var iceModule =  ng.module('app', [
			'ui.router',
			'app.login'
	]);

	iceModule.config(function($stateProvider, $urlRouterProvider) {
		iceModule.stateProvider = $stateProvider;
		$urlRouterProvider.otherwise('/list');
	});

	iceModule.run(function($rootScope, $state) {
		$state.transitionTo("login");

	});

	iceModule.controller('appController', function($scope, $state) {
	});

});
