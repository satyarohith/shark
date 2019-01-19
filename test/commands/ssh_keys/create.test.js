const {expect, test} = require('@oclif/test');

describe('ssh_keys:create', () => {
  test
    .stdout()
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .post('/account/keys', {
          name: 'shark',
          public_key: 'a public key'
        })
        .reply(200, {
          ssh_key: {
            name: 'shark'
          }
        })
    )
    .command(['ssh_keys:create', '-n', 'shark', '-k', 'a public key'])
    .it('shows successful create message', ctx => {
      expect(ctx.stdout).to.equal('shark created!\n');
    });
});
