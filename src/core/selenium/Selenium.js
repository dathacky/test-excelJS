const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// https://www.selenium.dev/documentation/en/webdriver

class Selenium {
  constructor(configs = {}) {
    const { runAsBrowser = 'chrome', OS = 'win32' } = configs;
    this.runAsBrowser = runAsBrowser;
    this.OS = OS;
    this.driver = null;
    this.init();
  }

  async init() {
    if (!this.driver) {
      let pathDriver = 'driver/win32/chromedriver.exe';
      switch (this.OS) {
        case 'win32':
          pathDriver = 'driver/win32/chromedriver.exe';
          break;
        case 'macos':
          pathDriver = 'driver/macos/chromedriver';
          break;
        case 'linux':
          pathDriver = 'driver/linux/chromedriver';
          break;
        default:
          pathDriver = 'driver/win32/chromedriver.exe';
          break;
      }
      const pathRelative = path.resolve(__dirname, pathDriver);
      const service = new chrome.ServiceBuilder(pathRelative).build();
      chrome.setDefaultService(service);
      const options = new chrome.Options();
      this.driver = chrome.Driver.createSession(options, service);
    }
  }

  async openBrowser({ input }) {
    if (url) {
      await this.driver.get(input);
    }
  }

  async navigateTo({ input }) {
    await this.driver.get(input);
  }

  async closeBrowser() {
    await this.driver.quit();
  }

  async click({ xpath }) {
    const element = await this.driver.findElement(By.xpath(xpath));
    await element.click();
  }

  async delay({ input }) {
    if (!isNaN(input)) {
      return new Promise((resolve) => {
        setTimeout(resolve, parseInt(input));
      });
    }
  }

  async back() {
    await this.driver.navigate().back();
  }

  async sendKey({ xpath, input }) {
    const element = await this.driver.findElement(By.xpath(xpath));
    if (input) {
      await element.sendKeys(input);
    }
  }

  async sendKeyAndEnter({ xpath, input }) {
    const element = await this.driver.findElement(By.xpath(xpath));
    await element.sendKeys(input, Key.ENTER);
  }

  async enter({ xpath }) {
    const element = await this.driver.findElement(By.xpath(xpath));
    await element.sendKeys(Key.ENTER);
  }

  async getText({ xpath }) {
    const element = await this.driver.findElement(By.xpath(xpath));
    return await element.getText();
  }

  async refresh() {
    await this.driver.navigate().refresh();
  }
}

module.exports = Selenium;
