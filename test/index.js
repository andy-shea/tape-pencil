import test from 'tape';
import proxyquire from 'proxyquire';

const testWithProvision = proxyquire('../src', {
  tape: (name, opts, cb) => cb({name, opts})
}).default;

test('single dependency is made available to the callback along with name and options', t => {
  const dependency = {foo: 'bar'};
  function provideSingleDependency() {
    return [dependency];
  }
  testWithProvision(provideSingleDependency, 'test name', {skip: true}, ({name, opts}, dep) => {
    t.equal(dep, dependency, 'dependency is passed to callback');
    t.equal(name, 'test name', 'correct name is passed to tape');
    t.equal(opts.skip, true, 'options are passed to tape');
    t.end();
  })
});

test('multiple dependencies are made available to the callback', t => {
  const dependencyOne = {foo: 'bar'};
  const dependencyTwo = {qux: 'norf'};
  function dependyTwoProvider() {
    return dependencyTwo;
  }
  function provideMultipleDependencies() {
    return [dependencyOne, dependyTwoProvider()];
  }
  testWithProvision(provideMultipleDependencies, 'test name', {skip: true}, (mock, dep1, dep2) => {
    t.equal(dep1, dependencyOne, 'dependency one is passed to callback');
    t.equal(dep2, dependencyTwo, 'dependency two is passed to callback');
    t.end();
  })
});

test('name parameter is optional', t => {
  testWithProvision(() => [], {skip: true}, ({name, opts}) => {
    t.equal(name, undefined, 'name is undefined');
    t.equal(opts.skip, true, 'options are passed to tape');
    t.end();
  })
});

test('options parameter is optional', t => {
  testWithProvision(() => [], 'test name', ({name, opts}) => {
    t.equal(name, 'test name', 'test name is passed to tape');
    t.equal(opts, undefined, 'options are undefined');
    t.end();
  })
});

test('name and options parameter are optional', t => {
  testWithProvision(() => [], ({name, opts}) => {
    t.equal(name, undefined, 'name is undefined');
    t.equal(opts, undefined, 'options are undefined');
    t.end();
  })
});
