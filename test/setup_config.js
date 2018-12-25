if (process.env.CI) {
  const Conf = require('conf');
  const config = new Conf();
  config.set('do_access_token', 'abcdefghijklmnop');
}
