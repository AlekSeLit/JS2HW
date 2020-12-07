const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/shop.js',
  output: {
    path: path.resolve(__dirname, 'VueShop/js'),
    filename: 'shop.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.[s]?css$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }, 
          'sass-loader',
        ]
      },
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' },
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
