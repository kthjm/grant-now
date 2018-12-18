# grant-now

[![npm](https://img.shields.io/npm/v/grant-now.svg?longCache=true&style=flat-square)](https://yarnpkg.com/en/package/grant-now)
[![npm](https://img.shields.io/npm/dm/grant-now.svg?longCache=true&style=flat-square)](https://www.npmjs.com/package/grant-now)
[![CircleCI](https://img.shields.io/circleci/project/github/kthjm/grant-now.svg?longCache=true&style=flat-square)](https://circleci.com/gh/kthjm/grant-now)
[![Coverage Status](https://img.shields.io/codecov/c/github/kthjm/grant-now.svg?longCache=true&style=flat-square)](https://codecov.io/github/kthjm/grant-now)

Using [grant](https://github.com/simov/grant) now.

## Installation
```shell
yarn add -D grant-now
```

## Usage
```js
require('grant-now')({
  open: false,
  [provider]: {
    token: 'XXXXXXXXXX',
    secret: 'XXXXXXXXXX'
  }
})
.then(console.log)
.catch(console.error)
```

#### Options
- `protocol = 'http'` Prepared for just in case.
- `port = 7000` Used as base port.
- `open = true` Open urls for connect by [`opn`](https://github.com/sindresorhus/opn).
- `[provider]` [grant's provider](https://github.com/simov/grant#configuration) without `callback` property.

## License

MIT (http://opensource.org/licenses/MIT)