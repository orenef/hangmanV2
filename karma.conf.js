const webpackConfig = require('./webpack.config.js');
webpackConfig.module.postLoaders = [
    {
        test: [/\.js$/, /\.jsx$/],
        exclude: [/node_modules/, /external_libraries/, /test/],
        loader: 'istanbul-instrumenter'
    }
];
module.exports = function (config) {
    config.set({
        basePath: '',
        singleRun: false,
        browsers: ['PhantomJS'],
        files: ['test/**/*.spec.js'],
        frameworks: ['jasmine'],
        preprocessors: {
            '**/test/**/*.js': ['webpack'],
            '**/app/**/*.js': ['coverage'],
            '**/src/**/*.js': ['coverage'],
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        reporters: ['progress', 'html', 'coverage', 'verbose'],
        htmlReporter: {
            outputFile: 'test/units.html',
            pageTitle: 'Unit Tests',
            subPageTitle: 'Stickman'
        },
        coverageReporter: {
            dir: 'test/coverage/',
            reporters: [
                {type: 'html', dir: 'test/coverage/'},
                {type: 'lcovonly', subdir: '.', file: 'lcov.info'},
                {type: 'text'},
                {type: 'text-summary'}
            ]
        },
    });
};