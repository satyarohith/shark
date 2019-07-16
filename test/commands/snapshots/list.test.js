const {expect, test} = require('@oclif/test');

describe('snapshots:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/snapshots').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['snapshots:list'])
    .it('shows no snapshots message', ctx => {
      expect(ctx.stdout).to.contain("You didn't take any snapshots\n");
    });


  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/snapshots').reply(200, {
        snapshots: [
          {
            id: '12345678',
            name: 'shark',
            regions: ['blr1'],
            created_at: '2019-02-20T13:55:28Z',
            resource_id: '876543210',
            resource_type: 'droplet',
            min_disk_size: 25,
            size_gigabytes: 1.22
          }
        ],
        links: {},
        meta: {
          total: 1
        }
      })
    )
    .stdout()
    .command(['snapshots:list'])
    .it('lists actions successfully', ctx => {
      expect(ctx.stdout).to.equal(expectedOutput);
    });

  const expectedOutput = `ID       Name  Created at                    Resource type Resource id Regions    Min disk size Size gigabytes \n12345678 shark Wed, 20 Feb 2019 13:55:28 GMT droplet       876543210   [ \'blr1\' ] 25            1.22           \n`;
});
