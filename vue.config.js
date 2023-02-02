const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  productionSourceMap: false, // 打包后不要sourcemap
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('views', resolve('src/views'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  // 配置该插件否则在渲染进程中无法import xxx from "electron";
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
};