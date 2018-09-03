const { DoAPI, spinner, config } = require('./util');

const deleteKey = key => {
  if (config.isExpired(key)) {
    config.delete(key);
  }
};

module.exports.loadAvailableDomains = async () => {
  try {
    spinner.start('Loading your domains..');
    const data = await DoAPI.domainsGetAll();
    spinner.stop();
    if (data.body.meta.total > 0) {
      let availableDomains = [];
      data.body.domains.map(domain => {
        availableDomains.push(domain.name);
      });
      return availableDomains;
    } else {
      console.log("You don't have any domains!");
      process.exit();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.loadAvailableRegions = async () => {
  // cache region since they don't change much
  let regions = [];
  // deletes key if key is expired
  deleteKey('do-regions');
  try {
    spinner.start('Loading available regions....');
    if (!config.has('do-regions')) {
      const data = await DoAPI.regionsGetAll();
      spinner.stop();
      data.body.regions.map(region => {
        if (region.available) {
          regions.push({
            name: region.name,
            value: region.slug
          });
        }
      });
      config.set('do-regions', regions, {
        maxAge: 8640000 // 24 hrs
      });
      return regions;
    } else {
      regions = config.get('do-regions');
      spinner.stop();
      return regions;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.loadAvailableDroplets = async () => {
  try {
    spinner.start('Loading your droplets...');
    const data = await DoAPI.dropletsGetAll();
    spinner.stop();
    let availableDroplets = [];
    if (data.body.meta.total > 0) {
      data.body.droplets.map(droplet => {
        availableDroplets.push({
          name: ` ${droplet.name} - ${droplet.size.slug} - ${
            droplet.networks.v4.length > 0
              ? droplet.networks.v4[0].ip_address
              : droplet.networks.v6[0].ip_address
          }`,
          value: {
            id: droplet.id,
            name: droplet.name,
            ip:
              droplet.networks.v4.length > 0
                ? droplet.networks.v4[0].ip_address
                : droplet.networks.v6[0].ip_address
          }
        });
      });

      return availableDroplets;
    } else {
      console.log(
        "You don't have any droplets! Please create droplet to proceed!"
      );
      process.exit();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.loadAvailableSizes = async () => {
  // cache sizes as they are mostly same
  const availableSizes = [];
  deleteKey('do-sizes');
  try {
    spinner.start('Loading available sizes...');
    if (!config.has('do-sizes')) {
      let data = await DoAPI.sizesGetAll();
      spinner.stop();
      data.body.sizes.map(size => {
        availableSizes.push({
          name: `${size.slug} - ${size.disk}GB - ${size.price_monthly}$/m`,
          value: size.slug
        });
      });
      config.set('do-sizes', availableSizes, {
        maxAge: 7 * 8640000 /* 7 days */
      });
      return availableSizes;
    } else {
      availableSizes = config.get('do-sizes');
      spinner.stop();
      return availableSizes;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.loadAvailableImages = async () => {
  let availableImages = [];
  deleteKey('do-images');
  try {
    spinner.start('Loading available images...');
    if (!config.has('do-images')) {
      const data = await DoAPI.imagesGetAll({
        per_page: 50
      });
      spinner.stop();
      data.body.images.map(image => {
        availableImages.push({
          name: `${image.distribution} ${image.name} - ${
            image.size_gigabytes
          }GB`,
          value: image.slug
        });
      });
      config.set('do-images', availableImages, {
        maxAge: 7 * 8640000 /* 7 days */
      });
      return availableImages;
    } else {
      availableImages = config.get('do-images');
      spinner.stop();
      return availableImages;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.loadAvailableSSHKEYS = async () => {
  try {
    spinner.start('Loading your ssh_keys...');
    const data = await DoAPI.accountGetKeys();
    spinner.stop();
    let availableSSHKEYS = [];
    if (data.body.meta.total > 0) {
      /* eslint-disable camelcase */
      data.body.ssh_keys.map(ssh_key => {
        availableSSHKEYS.push({
          name: ssh_key.name,
          value: ssh_key.id
        });
      });
      return availableSSHKEYS;
    } else {
      console.log("You don't have any ssh_keys!");
      process.exit();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.loadAvailableFloatingIps = async () => {
  try {
    spinner.start('Loading your floating_ips...');
    const data = await DoAPI.floatingIpsGetAll();
    spinner.stop();
    let availableFIps = [];
    if (data.body.meta.total > 0) {
      data.body.floating_ips.map(fip => {
        availableFIps.push({
          name: `${fip.ip} reserved at ${fip.region.name}`,
          value: fip.ip
        });
      });
      return availableFIps;
    } else {
      console.log("You don't have any floating_ips under your account");
      process.exit();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loadAvailableVolumes = async () => {
  try {
    spinner.start('Loading your volumes...');
    const data = await DoAPI.volumes();
    spinner.stop();
    let availableVolumes = [];
    if (data.body.meta.total > 0) {
      data.body.volumes.map(volume => {
        availableVolumes.push({
          name: volume.name,
          value: volume.id
        });
      });
      return availableVolumes;
    } else {
      console.log("You don't have any volumes under your account");
      process.exit();
    }
  } catch (error) {
    console.log(error.message);
  }
};
