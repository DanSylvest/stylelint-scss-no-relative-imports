import getOutput from '../../../utils/getOutput.js';
import getRootPath from '../../../utils/getRootPath';
import { lint } from '../../../utils/lint.js';
import { makeConf } from '../../../utils/makeConf.js';
import ruleName from '../ruleName.js';

jest.mock('../../../utils/getRootPath');

describe('testRelativeImports', () => {
  const FILE_PATH = '/home/user/project/src/styles/one/two/main.scss';
  const PROJECT_PATH = '/home/user/project';
  const PLUGIN_REL_PATH = 'src/styles';

  beforeAll(() => {
    getRootPath.mockReturnValue(PROJECT_PATH);
  });

  it('should show warn relative imports', async () => {
    const code = `
      @import '../shared2';
    `;

    const { warnings } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName),
    });

    expect(warnings).toHaveLength(1);
  });

  it('should fix relative imports with options', async () => {
    const code = `
      @import '../../shared';
      @import '../shared2';
    `;

    const { _postcssResult } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName, {
        rootPath: PLUGIN_REL_PATH,
      }),
      fix: true,
    });

    const res = getOutput(_postcssResult);

    expect(res).toEqual(`
      @import 'shared';
      @import 'one/shared2';
    `);
  });

  it('should fix relative imports', async () => {
    const code = `
      @import '../../shared';
      @import '../shared2';
    `;

    const { _postcssResult } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName),
      fix: true,
    });

    const res = getOutput(_postcssResult);

    expect(res).toEqual(`
      @import 'src/styles/shared';
      @import 'src/styles/one/shared2';
    `);
  });

  it('should fix conditional import', async () => {
    const code = `
      @import '../../shared' screen and (orientation: landscape);
    `;

    const { _postcssResult } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName),
      fix: true,
    });

    const res = getOutput(_postcssResult);

    expect(res).toEqual(`
      @import 'src/styles/shared' screen and (orientation: landscape);
    `);
  });

  it('should not warn with other types of imports', async () => {
    const code = `
      @import "theme.css";
      @import "http://fonts.googleapis.com/css?family=Droid+Sans";
      @import url(theme);
    `;

    const { warnings } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName),
    });

    expect(warnings).toHaveLength(0);
  });

  it('should return if empty import', async () => {
    const code = `
      @import ""
    `;

    const { warnings } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName),
    });

    expect(warnings).toHaveLength(0);
  });

  it('should return if invalid options', async () => {
    const code = `
      @import ""
    `;

    const { warnings } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName, { notExistsOpt: '' }),
    });

    expect(warnings).toHaveLength(0);
  });

  it('should return if no .scss ext', async () => {
    const FILE_PATH = '/home/user/project/src/styles/one/two/main.css';

    const code = `
      @import ""
    `;

    const { warnings } = await lint({
      codeFilename: FILE_PATH,
      code,
      config: makeConf(ruleName),
    });

    expect(warnings).toHaveLength(0);
  });
});
