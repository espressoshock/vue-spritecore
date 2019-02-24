module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  env: {
    browser: true,
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'indent': 'off', //no indent checking
    'semi': 0, //disable ASI semi checking
    'space-in-parens': ['error', 'never'], //0 space in parenthesis
    'space-before-function-paren': ['error', 'never'], //no space
    'keyword-spacing': [0, 'never'], //don't error keyword spacing
    'spaced-comment': ['error', 'never'], //no comment whitespaces
     'curly': 0,// allow inline no rucly bracket
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // trailing comma
    'comma-dangle': ['error', 'never'],
  }
}
