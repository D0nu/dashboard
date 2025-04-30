module.exports = {
    webpack: (config) => {
      config.optimization.splitChunks = false;
      return config;
    }
  };