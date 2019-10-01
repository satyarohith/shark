const Cache = require('cache-conf');

const cache = new Cache();

const DAY = 86400000; // 1 day in ms
const WEEK = 604800000; // 1 week in ms

const loadSSHKeys = async (api, spinner) => {
  try {
    spinner.start('Loading your ssh_keys...');
    const data = await api.accountGetKeys();
    spinner.stop();
    const availableSSHKEYS = [];
    if (data.body.meta.total === 0) {
      /* prettier-ignore */
      console.log('You don\'t have any ssh_keys!');
      process.exit();
    } else {
      data.body.ssh_keys.map(ssh_key =>
        availableSSHKEYS.push({
          message: ssh_key.name,
          value: ssh_key.id
        })
      );
      return availableSSHKEYS;
    }
  } catch (error) {
    console.error(error);
  }
};

const loadDropletSizes = async (api, spinner) => {
  try {
    spinner.start('Loading available sizes...');

    let data;

    if (cache.has('loadDropletSizes_data')) {
      data = cache.get('loadDropletSizes_data');
    } else {
      data = await api.sizesGetAll();
      cache.set('loadDropletSizes_data', data, {maxAge: WEEK});
    }

    spinner.stop();

    const availableSizes = [];
    data.body.sizes.map(size =>
      availableSizes.push({
        name: `${size.slug} - ${size.disk}GB - ${size.price_monthly}$/m`,
        value: size.slug
      })
    );

    return availableSizes;
  } catch (error) {
    console.error(error);
  }
};

const loadDropletImages = async (api, spinner) => {
  try {
    spinner.start('Loading available images...');

    let data;

    if (cache.has('loadDropletImages_data')) {
      data = cache.get('loadDropletImages_data');
    } else {
      data = await api.imagesGetAll({
        type: 'distribution',
        per_page: 50
      });
      cache.set('loadDropletImages_data', data, {maxAge: WEEK});
    }

    spinner.stop();

    const availableImages = [];
    data.body.images.map(image =>
      availableImages.push({
        name: `${image.distribution} ${image.name} - ${image.size_gigabytes}GB`,
        value: image.slug
      })
    );

    return availableImages;
  } catch (error) {
    console.error(error);
  }
};

const loadRegions = async (api, spinner) => {
  try {
    spinner.start('Loading regions...');
    let data;

    if (cache.has('loadRegions_data')) {
      data = cache.get('loadRegions_data');
    } else {
      data = await api.regionsGetAll();
      cache.set('loadRegions_data', data, {maxAge: DAY});
    }

    spinner.stop();
    const {
      body: {regions}
    } = data;

    return regions;
  } catch (error) {
    spinner.stop();
    console.error(error.message);
  }
};

module.exports = {
  loadSSHKeys,
  loadRegions,
  loadDropletSizes,
  loadDropletImages
};
