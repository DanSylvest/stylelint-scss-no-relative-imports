import stylelint from 'stylelint';

export const lint = async opts => {
  const { results } = await stylelint.lint(opts);
  const [all] = results;
  return all;
};
