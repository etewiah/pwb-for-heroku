const path = require('path')

module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      // '@components': path.resolve(__dirname, '..', '..', 'app/javascript/theme-vienna/components'),
      '@jsroot': path.resolve(__dirname, '..', '..', 'app/javascript'),
    }
  }
}

// const { environment } = require('@rails/webpacker')
// const vue =  require('./loaders/vue')

// environment.loaders.append('vue', vue)
// module.exports = environment
