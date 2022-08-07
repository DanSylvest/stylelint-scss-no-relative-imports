export const makeConf = (ruleName, options) => {
  return {
    plugins: ['./src'],
    rules: {
      [ruleName]: [true, ...(options ? [options] : [])],
    },
    customSyntax: 'postcss-scss',
  };
};
