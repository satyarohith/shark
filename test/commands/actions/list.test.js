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

  const expectedOutput = `ID        Status    Resource type Resource id Type    Started at           Completed at         Region \n593116925 completed droplet       125046402   destroy 2018-12-25T05:35:26Z 2018-12-25T05:35:28Z ncy1   \nCurrent Page: 1\nTotal Pages: 1\n`;

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
    .command(['actions:list'])
    .it('lists actions successfully', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
