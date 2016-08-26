/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

	paths: {
		'domReady': 'lib/requirejs-domready/domReady',
		'angular': 'lib/angular/angular',
		"uiRouter": "lib/angular/angular-ui-router",
		//"uiBootstrap": "lib/angular/ui-bootstrap-tpls-2.1.3",
		"uiBootstrap": "lib/angular-bootstrap/ui-bootstrap-tpls-0.11.0.min",
		"jquery": "lib/jquery/jquery-1.8.0",
		"login": "app/login"
	},

	/**
	 * for libs that either do not support AMD out of the box, or
	 * require some fine tuning to dependency mgt'
	 */
	shim: {
		'angular': {
			exports: 'angular'
		},
		'jquery': {
			exports: 'jquery'
		},
		'uiRouter':{
			deps: ['angular']
		},
		'uiBootstrap':{
			deps: ['angular']
		},
	},

	deps: [
		// kick start application... see bootstrap.js
		'./bootstrap'
	]
});

function loadCss(url) {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}
