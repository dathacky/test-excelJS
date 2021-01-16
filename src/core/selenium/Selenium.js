const { Builder, By, Key, until } = require('selenium-webdriver');

class Selenium {
  constructor({ runAsBrowser = 'chrome' }) {
    this.runAsBrowser = runAsBrowser;
  }

  loadScripts() {}
}

module.exports = Selenium;
