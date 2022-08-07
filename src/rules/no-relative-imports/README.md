# stylelint-scss-no-relative-imports/no-relative-imports

A rule which allow fix and warn relative imports of SCSS for Stylelint

The [`fix` option](https://stylelint.io/user-guide/usage/options#fix) can automatically fix all of the problems reported by this rule.

This rule doesn't have usual `"always"` and `"never"` main option values;
## Options

`boolean`

## Optional secondary options

### `rootPath: String | undefined`

Set root path for plugin.

### Config example

```json
{
  "plugins": [
    "stylelint-scss-no-relative-imports"
  ],
  "rules": {
    "stylelint-scss-no-relative-imports/no-relative-imports": [
      true,
      {
        "rootPath": "src/someNestedPath"
      }
    ]
  }
}
```

### Styles example
```scss
/* will show warn */
@import '../../test.scss';

/* will ok  */
@import 'src/styles/test.scss';
@import './test.scss';


/* if rootPath is set for example "src/styles" 
   and file is placing in src/styles/one/two/someStyle.scss
   then */
@import "../../nestedDir/style.scss";

/* will fixed to */
@import "nestedDir/style.scss";
```
