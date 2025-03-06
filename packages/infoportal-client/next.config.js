const path = require('path')

const withTM = require('next-transpile-modules')([
  // '@mui/x-telemetry',
  // '@mui/x-license',
  '@mui/x-date-pickers-pro'
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
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
})
