const {expect, test} = require('@oclif/test');

describe('domains:delete', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.delete('/domains/satyarohith.com').reply(204)
    )
    .stdout()
    .command(['domains:delete', '-n', 'satyarohith.com'])
    .it('outputs successful delete message', ctx => {
      expect(ctx.stdout).to.equal('Successfully deleted satyarohith.com\n');
    });

  // test
  //   .stdout()
  //   .command(['domains:delete', '--name', 'jeff'])
  //   .it('runs hello --name jeff', ctx => {
  //     expect(ctx.stdout).to.contain('hello jeff');
  //   });
});
