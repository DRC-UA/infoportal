import path from 'node:path'
import type {NextConfig} from 'next'

const config: NextConfig = {
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
    // ignoreBuildErrors: process.env.IGNORE_BUILD_TS_ERRORS === 'true',
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

export default config
