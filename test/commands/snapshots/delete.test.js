const {expect, test} = require('@oclif/test');

describe('snapshots:delete', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.delete('/snapshots/123456').reply(204)
    )
    .stdout()
    .command(['snapshots:delete', '--id', '123456'])
    .it('shows successful delete message', ctx => {
      expect(ctx.stdout).to.contain('successfully deleted!\n');
    });
});
