const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin') //引入
const path = require('path')

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    },
    admin: {
      entry: 'src/admin.ts',
      template: 'public/admin.html',
      filename: 'admin.html'
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    plugins: [new CompressionPlugin({
      test: /\.js$|\.html$|\.css/, //匹配文件名
      threshold: 10240, //对超过10K的数据进行压缩
      deleteOriginalAssets: false //是否删除原文件
    })]
  }
})
