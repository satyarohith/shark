const execa = require('execa');
const pkg = require('./package.json');

jest.setTimeout(10000);

describe('shark', () => {
  it('shows version with flag --version', async done => {
    const { stdout } = await execa('./shark.js', ['--version']);
    const expected = pkg.version;
    expect(stdout).toBe(expected);
    done();
  });
});
