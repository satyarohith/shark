// const {expect, test} = require('@oclif/test')

// describe('droplets:create', () => {
//   test
//   .stdout()
//   .command(['droplets:create'])
//   .it('runs hello', ctx => {
//     expect(ctx.stdout).to.contain('hello world')
//   })

//   test
//   .stdout()
//   .command(['droplets:create', '--name', 'jeff'])
//   .it('runs hello --name jeff', ctx => {
//     expect(ctx.stdout).to.contain('hello jeff')
//   })
// })
const {expect, test} = require('@oclif/test');

describe('droplets:create', () => {
  test
    .nock('https://api.digitalocean.com/v2/', api =>
      api
        .post('/droplets', {
          name: 'shark',
          image: 'ubuntu-18-10-x64',
          size: 's-1vcpu-1gb',
          region: 'blr1'
        })
        .reply(200, {
          droplet: {
            name: 'shark',
            region: {
              name: 'Bangalore 1'
            }
          }
        })
    )
    .stdout()
    .command([
      'droplets:create',
      '--name',
      'shark',
      '--image',
      'ubuntu-18-10-x64',
      '--size',
      's-1vcpu-1gb',
      '--region',
      'blr1'
    ])
    .it('shows successful create message', ctx => {
      const expectedOutput = `shark created at Bangalore 1\n`;
      expect(ctx.stdout).to.equal(expectedOutput);
    });
});
