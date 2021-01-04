const TYPEOF = {
  STRING: 'string',
  NULL: 'null',
  UNDEFINED: 'undefined',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NOT_ALLOW_INPUT: 'not_allow_input',
};

module.exports = {
  WORKSHEET: 'TEST_CASE',
  TYPE_ACTION: 'A:A',
  NAME: 'B:B',
  INPUT: 'C:C',
  DESCRIPTION: 'D:D',
  LIST_ACTION: {
    OPEN_BROWSER: 'openBrowser',
    CLOSE_BROWSER: 'closeBrowser',
    CLICK: 'click',
    DELAY: 'delay',
    BACK: 'back',
    SEND_KEY: 'sendKey',
    SET_TEXT: 'setText',
    GET_TEXT: 'getText',
    REFRESH: 'refresh',
  },
  ACTION_DATA_TYPE: {
    OPEN_BROWSER: [TYPEOF.STRING],
    CLOSE_BROWSER: [TYPEOF.NOT_ALLOW_INPUT],
    CLICK: [TYPEOF.STRING, TYPEOF.NUMBER],
    DELAY: [TYPEOF.NUMBER],
    BACK: [TYPEOF.NOT_ALLOW_INPUT],
    SEND_KEY: [TYPEOF.STRING, TYPEOF.NUMBER],
    SET_TEXT: [TYPEOF.NULL, TYPEOF.UNDEFINED],
    GET_TEXT: [TYPEOF.STRING, TYPEOF.NUMBER],
    REFRESH: [TYPEOF.NOT_ALLOW_INPUT],
  },
};
