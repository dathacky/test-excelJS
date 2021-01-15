const ExcelJS = require('./core/excel');

async function main() {
  const Excel = new ExcelJS();
  await Excel.importProject('test3.xlsx');
  await Excel.validationAllTestCase();
  const sumary = Excel.sumary;
  console.log(sumary);
  await Excel.exportProject('test4.xlsx');
}

main();
