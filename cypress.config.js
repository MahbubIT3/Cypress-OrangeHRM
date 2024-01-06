const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 10000,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: true,
  screenshotOnRunFailure: true,
  reporter: "mochawesome",
  reporterOptions: {
  charts: true,
  overwrite: false,
  html: false,
  json: true,
  reportDir: "cypress/reports"
  }

});
