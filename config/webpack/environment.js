const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')

const customConfig = require('./custom')
// Merge custom config
environment.config.merge(customConfig)

environment.loaders.append('vue', vue)


// // Set nested object prop using path notation
// environment.config.set('resolve.extensions', ['.foo', '.bar'])
// environment.config.set('output.filename', '[name].js')
// // Delete a property
// environment.config.delete('output.chunkFilename')

module.exports = environment