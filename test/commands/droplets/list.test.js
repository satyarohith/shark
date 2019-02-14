const {expect, test} = require('@oclif/test');

describe('droplets:list', () => {
  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/droplets?tag_name=&page=1').reply(200, {
        meta: {
          total: 0
        }
      })
    )
    .stdout()
    .command(['droplets:list'])
    .it('shows zero droplets available message', ctx => {
      expect(ctx.stdout).to.equal(
        'You have zero droplets under your account\n'
      );
    });

  const expectedOutput = `Id        Name Memory VCPUS Disk Public IPv4   Private IPv4  Public IPv6   Region Status \n123456789 test 1024   1     25   111.11.111.11 not available not available ams3   active \n`;

  test
    .nock('https://api.digitalocean.com/v2', api =>
      api.get('/droplets?tag_name=&page=1').reply(200, {
        droplets: [
          {
            id: 123456789,
            name: 'test',
            memory: 1024,
            vcpus: 1,
            disk: 25,
            locked: false,
            status: 'active',
            kernel: null,
            created_at: '2018-12-26T02:05:40Z',
            backup_ids: [],
            next_backup_window: null,
            snapshot_ids: [],
            image: {
              id: 39342610,
              name: '18.10 x64',
              distribution: 'Ubuntu',
              slug: 'ubuntu-18-10-x64',
              public: true,
              regions: [
                'nyc1',
                'sfo1',
                'nyc2',
                'ams2',
                'sgp1',
                'lon1',
                'nyc3',
                'ams3',
                'fra1',
                'tor1',
                'sfo2',
                'blr1'
              ],
              created_at: '2018-10-18T18:24:13Z',
              min_disk_size: 20,
              type: 'snapshot',
              size_gigabytes: 0.51
            },
            volume_ids: [],
            size: {
              price_hourly: 0.00744
            },
            networks: {
              v4: [
                {
                  ip_address: '111.11.111.11'
                }
              ],
              v6: []
            },
            region: {
              slug: 'ams3'
            },
            tags: ['shark']
          }
        ],
        links: {},
        meta: {
          total: 2
        }
      })
    )
    .stdout()
    .command(['droplets:list'])
    .it('lists droplets successfully', ctx => {
      expect(ctx.stdout).to.contain(expectedOutput);
    });
});
