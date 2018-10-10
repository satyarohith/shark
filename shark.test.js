const test = require('ava');
const execa = require('execa');
const pkg = require('./package.json');

test('outputs version with flag --version', async t => {
  const { stdout } = await execa('./shark.js', ['--version']);
  const expected = pkg.version;
  t.is(stdout, expected);
});
