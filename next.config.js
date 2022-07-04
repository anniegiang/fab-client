/* eslint-disable no-undef */
module.exports = {
  images: {
    domains: ["dnkvjm1f8biz3.cloudfront.net"]
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      }
    ];
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
