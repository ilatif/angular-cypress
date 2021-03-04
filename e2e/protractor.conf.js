// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
    {
      browserName: 'internet explorer',
      platform: 'ANY',
      version: '11'
    }
  ],
  // directConnect: true,
  SELENIUM_PROMISE_MANAGER: true,
  baseUrl: 'https://betteroffcalculator.co.uk/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  browserstackUser: 'policyinpractice1',
  browserstackKey: 'KPp7w5s9Ph7pSLNy2Zje',
  // localSeleniumStandaloneOpts: {
  //   jvmArgs: ["-Dwebdriver.ie.driver=node_modules//protractor//node_modules//webdriver-manager//selenium/IEDriverServer3.150.1.exe'"]
  // },
  'autoStartStopServer': true,
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  }
};