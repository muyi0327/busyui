// Karma configuration
// Generated on Fri Sep 23 2016 10:35:55 GMT+0800 (CST)
var webpackConf = require('./webpack.config')


module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            './test/unit/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [],


        plugins: [
            'karma-coverage',
            'karma-mocha',
            'karma-webpack',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-jsdom-launcher',
            'karma-chrome-launcher',
            'karma-safari-launcher'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './test/unit/**/*.spec.js': ['webpack', 'coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        //autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // browserify: {
        //   debug: true,
        //   transform: [
        //     ['babelify', {
        //       presets: ['es2015']
        //     }]
        //   ]
        // },

        webpack: webpackConf,

        webpackMiddleware: {
            noInfo: true
        },

        coverageReporter: {
            instrumenters: { isparta: require('isparta') },
            reporters: [{
                'type': 'text'
            }, {
                type: 'html',
                subdir: 'report-html'
            }, {
                'type': 'lcovonly',
                subdir: 'lcovonly'
            }, {
                type: 'text',
                subdir: '.',
                file: 'text.txt'
            },
            {
                type: 'text-summary',
                subdir: '.',
                file: 'text-summary.txt'
            }
            ]
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
