const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {PrismaPlugin} = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  plugins: [new PrismaPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
    fullySpecified: false,
    extensions: ['.ts', '.js'],
  },
  output: {
    module: true,
    libraryTarget: 'module',
    filename: 'bundle.mjs',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  externals: {
    '@prisma/client': '@prisma/client',
  },
}
