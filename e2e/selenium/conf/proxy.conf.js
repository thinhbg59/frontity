require("dotenv").config();
const { Builder } = require("selenium-webdriver");
var browserstack = require("browserstack-local");

var userName = process.env.BROWSERSTACK_USERNAME;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
var browserstackURL =
  "https://" +
  userName +
  ":" +
  accessKey +
  "@hub-cloud.browserstack.com/wd/hub";
exports.config = {
  user: userName,
  key: accessKey,
  updateJob: false,
  specs: ["./selenium/tests/specs/selenium-ide.js"],
  exclude: [],
  maxInstances: 10,
  commonCapabilities: {
    "browserstack.local": true,
    "browserstack.use_w3c": true,
    "bstack:options": {
      buildName: "Proxy-tests",
      debug: true,
    },
  },
  capabilities: [
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "80",
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "Firefox",
      browser_version: "82",
    },
  ],
  logLevel: "warn",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: "hub.browserstack.com",
  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ key: exports.config.key }, function (error) {
        if (error) return reject(error);
        console.log("Connected. Now testing...");

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: function (capabilties, specs) {
    exports.bs_local.stop(function () {});
  },
  before: (capabilities) => {
    driver = new Builder()
      .usingServer(browserstackURL)
      .withCapabilities(capabilities)
      .build();
    global.expect = driver;
  },
  afterTest: async (test, context, result) => {
    let { passed, error } = result;
    !passed &&
      (await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${
          error.name + ": " + error.message.replace(/\n/g, "")
        }"}}`
      ));
  },
  after: () => {
    driver.quit();
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});