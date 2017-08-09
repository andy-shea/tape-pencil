<p align="center"><img alt="A pencil rewinding a cassette tape" src="https://farm8.static.flickr.com/7567/27795910783_eae6c8966b_b.jpg" width="300"/></p>

# Pencil for tape

[![Build Status](https://travis-ci.org/andy-shea/tape-pencil.svg?branch=master)](https://travis-ci.org/andy-shea/tape-pencil)
[![Code Coverage](http://codecov.io/github/andy-shea/tape-pencil/coverage.svg?branch=master)](http://codecov.io/github/andy-shea/tape-pencil?branch=master)

A small helper to inject complex dependencies into your [**tape**](https://github.com/substack/tape) tests.

## Install

```yarn add --dev tape-pencil```

## API

### testWithProvision(provider, [name], [opts], cb)
Create a new test with an optional `name` string and optional `opts` object.
`cb(t, dep1, dep2, ..., depx)` is fired with the new test object along with the dependencies returned from calling the `provider` function.

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
