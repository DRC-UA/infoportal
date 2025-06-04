const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  externalDir: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 200,
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: process.env.IGNORE_BUILD_TS_ERRORS === 'true',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@mui/system',
    '@mui/utils',
    '@mui/x-date-pickers-pro',
    'axios',
    'react-router',
    'react-router-dom',
    'cookie',
  ],
}
