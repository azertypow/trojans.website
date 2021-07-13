// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {

    publicPath: process.env.NODE_ENV === 'production'
        ? 'http://http://trojanscollective.com/'
        : '/',
    pwa: {
        themeColor: '#00EF2E',
    },

}
