module.exports = function(config) {
	config.set({
    basePath: '',
    files: [
      {pattern: 'node_modules/jquery/dist/jquery.js', watched: false},
      {pattern: 'node_modules/angular/angular.js', watched: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', watched: false},
      'app/*.js',
      'app/**/*.js',
      'specs/*-spec.js'
    ],
		frameworks: ['jasmine'],
		browsers: ['PhantomJS'],
		autoWatch: true,
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		reporters: ['mocha'],
		mochaReporter: {
			output: 'autowatch'
    },
		plugins: [
			'karma-jasmine',
			'karma-mocha-reporter',
			'karma-phantomjs-launcher'
		]
	});
};
