import stylelint from 'stylelint';

import ruleName from './ruleName.js';

const ruleMessages = stylelint.utils.ruleMessages(ruleName, {
  expected: (unfixed, fixed) => `Expected "${unfixed}" to be "${fixed}"`,
});

export default ruleMessages;
