const { defineConfig } = require('@vue/cli-service')

const getProxyTarget = () => {
  if (process.env.VUE_APP_API_URL) {
    return process.env.VUE_APP_API_URL;
  }
  return 'http://localhost:3003';
}

module.exports = defineConfig({
  devServer: {
    port: process.env.VUE_APP_PORT || 8081,
    proxy: {
      '/api': {
        target: getProxyTarget(),
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      },
    },
  },
  transpileDependencies: true
})
