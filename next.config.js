/* eslint-disable no-undef */
module.exports = {
  images: {
    domains: ["dnkvjm1f8biz3.cloudfront.net"]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      constants: false
    };
    return config;
  }
};
