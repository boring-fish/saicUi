const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = '/';

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  pages: undefined,
  productionSourceMap: false,
  devServer: {
    port: 3000,
    disableHostCheck: true,
    //反向代理
    proxy: {
      '/api': {
        // target: 'http://10.106.45.78:8080',
        // target: 'https://ak4soo9ohsie.cd.leadswarp.com',
        target: 'http://10.106.20.1:8080',

        changeOrigin: true,
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/scss/variables.scss";`
      }
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      return [
        {
          ...args[0],
          title: '营销闭环度量看板'
        }
      ];
    });
    // if (process.env.NODE_ENV === 'production') {
    //   config
    //     .plugin('uglifyjs-plugin')
    //     .use('uglifyjs-webpack-plugin', [{
    //       uglifyOptions: {
    //         warnings: false,
    //         compress: {
    //           drop_console: true,
    //           drop_debugger: false,
    //           pure_funcs: ['console.log']
    //         }
    //       }
    //     }])
    //     .end();
    //   // config
    //   //   .plugin('gzip-plugin')
    //   //   .use('compression-webpack-plugin', [{
    //   //     filename: '[path].gz[query]',
    //   //     algorithm: 'gzip',
    //   //     test: /\.js$|\.html$|\.json$|\.css$|\.ttf$/,
    //   //     threshold: 0, // 只有大小大于该值的资源会被处理
    //   //     minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
    //   //     deleteOriginalAssets: true // 删除原文件
    //   //   }])
    //   //   .end();
    // }
  }
}