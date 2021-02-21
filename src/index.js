const ExcelJS = require('./core/excel');
const Selenium = require('./core/selenium');
const { get } = require('lodash');

async function main() {
  const Excel = new ExcelJS();
  const browser = new Selenium({ OS: 'macos' });
  await Excel.importProject('run.xlsx');
  await Excel.addDataValidationAllTestCase();
  const data = Excel.loadScript('visit and search');
  for (const action of data.scripts) {
    const typeAction = get(action, 'typeAction');
    const isValid = get(action, 'isValid');
    const input = get(action, 'input');
    const xpath = get(action, 'xpath');
    if (typeAction && isValid) {
      // TODO: Handle error
      await browser[typeAction]({ input, xpath });
    }
  }
  console.log('data scripts', data);
  const sumary = Excel.sumary;
  console.log(sumary);
  await browser.closeBrowser();
  // await Excel.exportProject('test4.xlsx');
}

main();
