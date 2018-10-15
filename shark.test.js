const test = require('ava');
const execa = require('execa');

test('outputs version with flag --version', async t => {
  const { stdout } = await execa('./shark.js', ['--version']);
  t.true(stdout.length > 0);
});
