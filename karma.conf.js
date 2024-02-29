// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        autoWatch: true,
        basePath: '',
        browsers: ['ChromeHeadlessCI'],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        colors: true,
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, './coverage/live-site'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true,
        },
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-extensions'],
            },
        },
        failOnEmptyTestSuite: false,
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        logLevel: config.LOG_INFO,
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        port: 9876,
        reporters: ['progress', 'kjhtml'],
        restartOnFileChange: true,
        singleRun: true,
    });
};
