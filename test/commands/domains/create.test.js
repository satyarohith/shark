const {expect, test} = require('@oclif/test');

describe('domains:create', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .post('/domains', {
          name: 'satyarohith.com'
        })
        .reply(204, {
          domain: {
            name: 'satyarohith.com'
          }
        })
    )
    .stdout()
    .command(['domains:create', '-n', 'satyarohith.com'])
    .it('outputs successful create message', ctx => {
      expect(ctx.stdout).to.equal('Successfully created satyarohith.com\n');
    });
});
