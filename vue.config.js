module.exports = {
  baseUrl: '.',
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    module: {
      exprContextCritical: false
    }
  }
}
