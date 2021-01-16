const ExcelJS = require('./core/excel');

async function main() {
  const Excel = new ExcelJS();
  await Excel.importProject('test3.xlsx');
  await Excel.addDataValidationAllTestCase();
  const data = Excel.loadScript('login and logout');
  console.log('data scripts', data);
  const sumary = Excel.sumary;
  console.log(sumary);
  await Excel.exportProject('test4.xlsx');
}

main();
