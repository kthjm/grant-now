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
require('dotenv/config')

require('grant-now')({
  open: false,
  [provider]: {
    token: '...',
    secret: '...',
  }
})
```

#### Options
- `protocol = 'http'` Prepared for just in case.
- `port = 7000` Used as base port.
- `open = true` Open connect urls.
- `[provider]` [grant's provider](https://github.com/simov/grant#configuration) without `callback` property.

#### Result
```
Promise<{
  [provider]: {
    server,
    connect_url
  }
}>
```

## License

MIT (http://opensource.org/licenses/MIT)