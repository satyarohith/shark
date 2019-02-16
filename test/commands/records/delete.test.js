const {expect, test} = require('@oclif/test');

describe('records:delete', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.delete('/domains/satyarohith.com/records/12345').reply(204)
    )
    .stdout()
    .command(['records:delete', '-n', 'satyarohith.com', '-i', '12345'])
    .it('shows delete message', ctx => {
      expect(ctx.stdout).to.equal('Domain record deleted!\n');
    });
});
