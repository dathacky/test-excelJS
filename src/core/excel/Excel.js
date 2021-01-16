const ExcelJS = require('exceljs');
const { get, values, findKey } = require('lodash');
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

  addDataValidationAllTestCase() {
    const worksheetTestcases = this.workbook.getWorksheet(
      DEFINE.TESTCASES.WORKSHEET,
    );
    worksheetTestcases
      .getColumn(DEFINE.TESTCASES.NAME_WORKSHEET)
      .eachCell({ includeEmpty: false }, (cell) => {
        const nameTestcase = cell.value;
        this.addDataValidationTestCase(nameTestcase);
      });
  }

  addDataValidationTestCase(worksheetName) {
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

  loadScript(scriptName) {
    const scripts = [];
    let invalid = [];
    const worksheetTestcases = this.workbook.getWorksheet(scriptName);
    worksheetTestcases
      .getColumn(DEFINE.REPOSITORIES.NAME_WORKSHEET)
      .eachCell({ includeEmpty: true }, (cell) => {
        const nameWorksheetTestcase = cell.value;
        const resultScript = this.getScriptActionFromTestcase(
          nameWorksheetTestcase,
        );
        if (!resultScript.isValid) {
          invalid.push(nameWorksheetTestcase);
        }
        scripts.push(resultScript.actions);
      });
    return { scripts, invalid };
  }

  getScriptActionFromTestcase(testcaseName) {
    const actions = [];
    let valid = true;
    const worksheetTestcase = this.workbook.getWorksheet(testcaseName);
    worksheetTestcase.eachRow({ includeEmpty: false }, (cell) => {
      const testcaseName = get(cell, 'worksheet.name');
      const typeAction = get(cell, 'model.cells[0].value');
      const name = get(cell, 'model.cells[1].value');
      const input = get(cell, 'model.cells[2].value');
      const description = get(cell, 'model.cells[3].value');
      const isValid = this.validateAction(typeAction, input);
      if (!isValid) {
        valid = false;
      }
      const dataScript = {
        testcaseName,
        typeAction,
        name,
        input,
        description,
        isValid,
      };
      actions.push(dataScript);
    });
    return { actions, isValid: valid };
  }

  validateAction(typeAction, input) {
    if (Object.values(DEFINE.TESTCASE.LIST_ACTION).includes(typeAction)) {
      const keyTypeAction = findKey(
        DEFINE.TESTCASE.LIST_ACTION,
        (value) => value === typeAction,
      );
      if (keyTypeAction) {
        const funcCheckValidateAction =
          DEFINE.TESTCASE.ACTION_DATA_TYPE[keyTypeAction];
        return funcCheckValidateAction(input);
      }
    }
    return false;
  }

  get sumary() {
    return this._sumary;
  }
}

module.exports = Excel;
