import stylelint from 'stylelint';

import rules from './rules';
import namespace from './utils/namespace.js';

const rulesPlugins = Object.keys(rules).map(ruleName => {
  return stylelint.createPlugin(namespace(ruleName), rules[ruleName]);
});

export default rulesPlugins;
