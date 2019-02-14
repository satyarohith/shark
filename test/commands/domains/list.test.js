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

  const resData = {
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
  };

  const expectedOutput =
    'Name            TTL  \nsatyarohith.com 1800 \nexample.com     3600 \n';

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/domains?tag_name=&page=1').reply(200, resData)
    )
    .stdout()
    .command(['domains:list'])
    .it('list all domains', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const json = JSON.stringify(resData, null, 2);

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/domains?tag_name=&page=1').reply(200, resData)
    )
    .stdout()
    .command(['domains:list', '--json'])
    .it('outputs json with --json', ctx => {
      expect(ctx.stdout).to.equal(json + '\n');
    });
});
