const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {PrismaPlugin} = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new PrismaPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // Change to 'production' for production builds
}
