const { isEmpty } = require('lodash');

const TYPEOF = {
  STRING: 'string',
  NULL: 'null',
  UNDEFINED: 'undefined',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
};

function isString(data) {
  return typeof data === TYPEOF.STRING;
}

function notAllowInput(data) {
  return isEmpty(data);
}

function isNumber(data) {
  return !isNaN(data);
}

module.exports = {
  WORKSHEET: 'TEST_CASE',
  COLUMN_TYPE_ACTION: 'A',
  COLUMN_XPATH: 'B',
  COLUMN_INPUT: 'C',
  COLUMN_DESCRIPTION: 'D',
  TYPE_ACTION: 'A:A',
  NAME: 'B:B',
  INPUT: 'C:C',
  DESCRIPTION: 'D:D',
  LIST_ACTION: {
    OPEN_BROWSER: 'openBrowser',
    NAVIGATE_TO: 'navigateTo',
    CLOSE_BROWSER: 'closeBrowser',
    CLICK: 'click',
    DELAY: 'delay',
    BACK: 'back',
    SEND_KEY: 'sendKey',
    SEND_KEY_AND_ENTER: 'sendKeyAndEnter',
    ENTER: 'enter',
    GET_TEXT: 'getText',
    REFRESH: 'refresh',
    COMMENT: 'comment',
  },
  ACTION_DATA_TYPE: {
    OPEN_BROWSER: (data) => isString(data),
    NAVIGATE_TO: (data) => isString(data),
    CLOSE_BROWSER: (data) => notAllowInput(data),
    CLICK: (data) => isString(data),
    DELAY: (data) => isNumber(data),
    BACK: (data) => notAllowInput(data),
    SEND_KEY: (data) => isString(data),
    SEND_KEY_AND_ENTER: (data) => isString(data),
    ENTER: (data) => isString(data),
    GET_TEXT: (data) => isString(data),
    REFRESH: (data) => notAllowInput(data),
    COMMENT: (data) => notAllowInput(data),
  },
};
