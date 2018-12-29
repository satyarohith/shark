const {expect, test} = require('@oclif/test');

describe('projects:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/account/keys?tag_name=&page=1').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['ssh_keys:list'])
    .it('shows no ssh_keys message', ctx => {
      expect(ctx.stdout).to.equal(
        "You don't have any SSH keys under this account\n"
      );
    });

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/account/keys?tag_name=&page=1').reply(200, {
        ssh_keys: [
          {
            id: 12345678,
            fingerprint: '12:34:46:ab:78:a1:b2:3e:4f:5g:a6:7b:a8:bc:1d:01',
            name: 'shark'
          }
        ],
        meta: {
          total: 1
        }
      })
    )
    .stdout()
    .command(['ssh_keys:list'])
    .it('lists ssh_keys', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const expectedOutput = `Name  ID       Fingerprint                                     \nshark 12345678 12:34:46:ab:78:a1:b2:3e:4f:5g:a6:7b:a8:bc:1d:01 \n`;
});
