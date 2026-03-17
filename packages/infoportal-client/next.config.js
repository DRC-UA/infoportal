import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
export default {
  outputFileTracingRoot: join(__dirname, '../../'),
  externalDir: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 200,
  output: 'standalone',
  skipTrailingSlashRedirect: true,
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
