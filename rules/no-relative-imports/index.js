import getRootPath from '../../utils/getRootPath.js';

import stylelint from 'stylelint';

import * as path from 'path';

import ruleMessages from './ruleMessages.js';
import ruleName from './ruleName.js';

const { report, validateOptions } = stylelint.utils;

const rule = (primaryOption, options, context) => {
  return (postcssRoot, postcssResult) => {
    const validOptions = validateOptions(postcssResult, ruleName, {
      actual: options,
      optional: true,
      possible: {
        rootPath: [undefined, String],
      },
    });

    if (!validOptions) {
      return;
    }

    const { rootPath = '.' } = options ?? {};

    const isAutoFixing = Boolean(context.fix);

    postcssRoot.walkAtRules('import', rule => {
      const _projectRootPath = path.normalize(getRootPath());
      const _rootPath = path.normalize(rootPath);
      const _fileDir = path.dirname(path.normalize(postcssResult.opts.from));

      const result = rule.params.match(/(["'])(.*?)["'](.*)/m);
      if (!result) {
        return;
      }

      const [, quote, importPath, rest] = result;
      if (importPath === '') {
        return;
      }

      const _importPath = path.normalize(importPath);
      const [firstHop] = _importPath.split(path.sep);
      if (firstHop === '..') {
        const resolvedImport = path.resolve(_fileDir, _importPath);
        const resolvedRoot = path.resolve(_projectRootPath, _rootPath);
        const resolved = resolvedImport.replace(resolvedRoot, '').slice(1);

        const fixed = `${quote}${resolved}${quote}${rest}`;
        if (isAutoFixing) {
          rule.params = fixed;
          return;
        }

        report({
          ruleName,
          result: postcssResult,
          message: ruleMessages.expected(importPath, fixed),
          node: rule,
          word: importPath,
        });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = ruleMessages;

export default rule;
