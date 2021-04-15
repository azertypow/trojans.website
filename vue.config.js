// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {

    publicPath: process.env.NODE_ENV === 'production'
        ? 'http://trojans-prototype.glitch.me/'
        : '/',
    pwa: {
        themeColor: '#00EF2E',
    },

}
