const {expect, test} = require('@oclif/test');

describe('actions:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/actions?tag_name=&page=1').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['actions:list'])
    .it('shows no actions performed message', ctx => {
      expect(ctx.stdout).to.contain("You haven't perfomed any actions\n");
    });

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/actions?tag_name=&page=1').reply(200, {
        actions: [
          {
            id: 593116925,
            status: 'completed',
            resource_type: 'droplet',
            resource_id: 125046402,
            type: 'destroy',
            started_at: '2018-12-25T05:35:26Z',
            completed_at: '2018-12-25T05:35:28Z',
            region_slug: 'ncy1'
          }
        ],
        links: {},
        meta: {
          total: 1
        }
      })
    )
    .stdout()
    .command(['actions:list', '--no-truncate'])
    .it('lists actions successfully', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const expectedOutput = `ID        Resource id Resource type Region Status    Type    Started at                    Completed at                  \n593116925 125046402   droplet       ncy1   completed destroy Tue, 25 Dec 2018 05:35:26 GMT Tue, 25 Dec 2018 05:35:28 GMT \n`;
});
