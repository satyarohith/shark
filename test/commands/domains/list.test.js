const {expect, test} = require('@oclif/test');

describe('domains:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/domains?tag_name=&page=1').reply(200, {
        domains: [],
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['domains:list'])
    .it('outputs zero domains message', ctx => {
      expect(ctx.stdout).to.equal("You don't have any domains\n");
    });

  const expectedOutput = 'satyarohith.com  1800\nexample.com  3600\n';
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/domains?tag_name=&page=1').reply(200, {
        domains: [
          {
            name: 'satyarohith.com',
            ttl: 1800
          },
          {
            name: 'example.com',
            ttl: 3600
          }
        ],
        meta: {
          total: 2
        }
      })
    )
    .stdout()
    .command(['domains:list'])
    .it('list all domains', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
