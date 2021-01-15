const ExcelJS = require('exceljs');
const { values } = require('lodash');
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
  async exportProject(file) {
    await this.workbook.xlsx.writeFile(file);
  }
  validationAllTestCase() {
    const worksheetTestcases = this.workbook.getWorksheet(
      DEFINE.TESTCASES.WORKSHEET,
    );
    worksheetTestcases
      .getColumn(DEFINE.TESTCASES.NAME_WORKSHEET)
      .eachCell({ includeEmpty: false }, (cell) => {
        const nameTestcase = cell.value;
        this.validationTestCase(nameTestcase);
      });
  }
  validationTestCase(worksheetName) {
    //TODO validation input, description
    const worksheetTestcase = this.workbook.getWorksheet(worksheetName);
    const options = values(DEFINE.TESTCASE.LIST_ACTION).join(',');
    worksheetTestcase
      .getColumn(DEFINE.TESTCASE.COLUMN_TYPE_ACTION)
      .eachCell({ includeEmpty: true }, (cell) => {
        cell.dataValidation = {
          type: 'list',
          allowBlank: false,
          formulae: [`"${options}"`],
          operator: 'equal',
          showErrorMessage: true,
          errorStyle: 'error',
          errorTitle: 'Invalid action',
          error: 'The action invalid, must be the value in the list',
        };
      });
  }
  get sumary() {
    return this._sumary;
  }
}

module.exports = Excel;
