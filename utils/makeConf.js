export const makeConf = (ruleName, options) => {
  return {
    plugins: ['./'],
    rules: {
      [ruleName]: [true, ...(options ? [options] : [])],
    },
    customSyntax: 'postcss-scss',
  };
};
