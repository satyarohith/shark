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
      /* eslint-disable camelcase */
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
  const availableSizes = [];
  try {
    spinner.start('Loading available sizes...');
    // If (config.has('do-sizes')) {
    //   availableSizes = config.get('do-sizes');
    //   spinner.stop();
    // } else {
    const data = await api.sizesGetAll();
    spinner.stop();
    data.body.sizes.map(size =>
      availableSizes.push({
        name: `${size.slug} - ${size.disk}GB - ${size.price_monthly}$/m`,
        value: size.slug
      })
    );
    // Config.set('do-sizes', availableSizes, {
    //   maxAge: 7 * 8640000 /* 7 days */
    // });
    // }
    return availableSizes;
  } catch (error) {
    console.error(error);
  }
};

const loadDropletImages = async (api, spinner) => {
  const availableImages = [];
  try {
    spinner.start('Loading available images...');
    // If (config.has('do-images')) {
    // availableImages = config.get('do-images');
    // spinner.stop();
    // } else {
    const data = await api.imagesGetAll({
      per_page: 50
    });
    spinner.stop();
    data.body.images.map(image =>
      availableImages.push({
        name: `${image.distribution} ${image.name} - ${image.size_gigabytes}GB`,
        value: image.slug
      })
    );
    // Config.set('do-images', availableImages, {
    //   maxAge: 7 * 8640000 /* 7 days */
    // });
    // }
    return availableImages;
  } catch (error) {
    console.error(error);
  }
};

const loadRegions = async (api, spinner) => {
  try {
    spinner.start('Loading regions...');
    const {
      body: {regions}
    } = await api.regionsGetAll();
    spinner.stop();
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
