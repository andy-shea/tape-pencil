import test from 'tape';

function testWithProvision(provider, ...args) {
  let name, opts, cb;
  if (args.length === 3) [name, opts, cb] = args;
  else if (args.length === 2) {
    if (typeof args[0] === 'object') [opts, cb] = args;
    else [name, cb] = args;
  }
  else [cb] = args;
  test(name, opts, t => cb(t, ...provider()));
}

export default testWithProvision;
