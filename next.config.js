require('dotenv').config()
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    modules: true,
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack(config, options) {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    )
    return config
  }
}));