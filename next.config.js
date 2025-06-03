// next.config.js
// old method, deprecated
// module.exports = {
//   images: {
//     domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
//   },
// };

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**', // allow all paths under this domain
      },
    ],
  },
};
