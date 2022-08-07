# stylelint-scss-no-relative-imports

![Coveralls](https://img.shields.io/coveralls/github/DanSylvest/stylelint-scss-no-relative-imports)

A rule which allow fix and warn relative imports of SCSS for Stylelint
## Installation

Install with npm

```bash
  npm i --save-dev stylelint-scss-no-relative-imports
```


## Usage/Examples

This plugin will fix foutes from project root path by box.

Create the .stylelintrc.json config file (or open the existing one), add stylelint-scss-no-relative-imports to the plugins array and the rules you need to the rules list. All rules from stylelint-scss-no-relative-imports need to be namespaced with scss.
```json
{
  "plugins": [
    "stylelint-scss-no-relative-imports"
  ],
  "rules": {
    "stylelint-scss-no-relative-imports/no-relative-imports": true
  }
}
```

## List of rules

### `@`-import

- [`no-relative-imports`](./rules/no-relative-imports/README.md): This is the rule which check and fix import path if it go top to the directories relativetely.