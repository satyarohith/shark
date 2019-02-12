const {expect, test} = require('@oclif/test');

describe('ssh_keys:get', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/account/keys/123456').reply(200, {
        ssh_key: {
          id: 123456,
          public_key:
            'ssh-rsa ZIBRISHDHKJHF+)#*&(Y#$(IOUKDSHKHKHSLH((@&#O)W*)D&S&@(?FJP@&()*SHHWK shark'
        }
      })
    )
    .stdout()
    .command(['ssh_keys:get', '-i', '123456'])
    .it('outputs ssh_key', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const expectedOutput =
    'ssh-rsa ZIBRISHDHKJHF+)#*&(Y#$(IOUKDSHKHKHSLH((@&#O)W*)D&S&@(?FJP@&()*SHHWK shark\n';
});
