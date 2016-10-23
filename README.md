# Pencil for tape

[![Build Status](https://travis-ci.org/andy-shea/tape-pencil.svg?branch=master)](https://travis-ci.org/andy-shea/tape-pencil)
[![Code Coverage](http://codecov.io/github/andy-shea/tape-pencil/coverage.svg?branch=master)](http://codecov.io/github/andy-shea/tape-pencil?branch=master)

A small helper for [tape](https://github.com/substack/tape) to inject dependencies into your tests.

## Install

```npm install tape-pencil --save-dev```

## API

### testWithProvision(provider, [name], [opts], cb)
Create a new test with an optional `name` string and optional `opts` object.
`cb(t, dep1, dep2, ..., depx)` is fired with the new test object and dependencies returned from the `provider`.

## Example

```javascript
import testWithProvision from 'tape-pencil';

function provideDependencies() {
  return [{foo: 'bar'}, someDependency()];
}

testWithProvision(provideDependencies, 'Test this or that', (t, dependencyOne, dependencyTwo) => {
  // dependencyOne: ({foo: 'bar'}) and dependencyTwo: (the return value of someDependency())
  // are now available in your test
});
```

## Licence

[MIT](./LICENSE)
