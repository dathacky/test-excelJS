const ExcelJS = require('exceljs');

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Dat';
  workbook.lastModifiedBy = 'DatModified';
  workbook.created = new Date(2020, 12, 31);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(202, 12, 31);
  workbook.properties.date1904 = true;
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: 'visible',
    },
  ];
  // create new sheet with pageSetup settings for A4 - landscape
  const worksheet = workbook.addWorksheet('My Sheet', {
    pageSetup: { paperSize: 9, orientation: 'landscape' },
  });
  worksheet.columns = [
    { header: 'type_action', key: 'type_action', width: 15 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'input', key: 'input', width: 20, outlineLevel: 1 },
    { header: 'description', key: 'description', width: 25, outlineLevel: 1 },
  ];
  worksheet.addRow(['click', 'click login', '#login', 'click to button login']);
  await workbook.xlsx.writeFile('test.xlsx');
}

main();
