const ExcelJS = require('./core/excel');

async function main() {
  const Excel = new ExcelJS();
  await Excel.importProject('test3.xlsx');
  const sumary = Excel.sumary;
  console.log(sumary);
}

main();
