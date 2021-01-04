const ExcelJS = require('exceljs');
const DEFINE = require('../../constants');

class Excel {
  constructor() {
    this._sumary = {
      name: null,
      created_by: null,
      created_at: null,
      description: null,
    };
    this.workbook = new ExcelJS.Workbook();
  }
  async importProject(file) {
    await this.workbook.xlsx.readFile(file);
    const worksheetSumary = this.workbook.getWorksheet(DEFINE.SUMARY.WORKSHEET);
    const name = worksheetSumary.getCell(DEFINE.SUMARY.NAME);
    const created_by = worksheetSumary.getCell(DEFINE.SUMARY.CREATED_BY);
    const created_at = worksheetSumary.getCell(DEFINE.SUMARY.CREATED_AT);
    const description = worksheetSumary.getCell(DEFINE.SUMARY.DESCRIPTION);
    this._sumary = {
      name,
      created_by,
      created_at,
      description,
    };
  }
  get sumary() {
    return this._sumary;
  }
}

module.exports = Excel;
