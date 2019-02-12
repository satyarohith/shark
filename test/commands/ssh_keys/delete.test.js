const {expect, test} = require('@oclif/test');

describe('ssh_keys:delete', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.delete('/account/keys/123456').reply(204)
    )
    .stdout()
    .command(['ssh_keys:delete', '--id', '123456'])
    .it('shows successful delete message - ID', ctx => {
      expect(ctx.stdout).to.contain('successfully deleted!\n');
    });

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api
        .delete(
          `/account/keys/${encodeURIComponent(
            '12:34:46:ab:78:a1:b2:3e:4f:5g:a6:7b:a8:bc:1d:01'
          )}`
        )
        .reply(204)
    )
    .stdout()
    .command([
      'ssh_keys:delete',
      '--fingerprint',
      '12:34:46:ab:78:a1:b2:3e:4f:5g:a6:7b:a8:bc:1d:01'
    ])
    .it('shows successful delete message - fingerprint', ctx => {
      expect(ctx.stdout).to.contain('successfully deleted!\n');
    });
});
