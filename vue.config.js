const path = require('path')

function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/common/style/theme.less'), // 需要全局导入的less
      ],
    })
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: (config) => {
    const types = [ 'vue-modules', 'vue', 'normal-modules', 'normal' ]
    types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
}
