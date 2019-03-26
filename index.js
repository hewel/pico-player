const Bundler = require('parcel-bundler')
const Path = require('path')

const entryFiles = Path.join(__dirname, './src/index.html')

const options = {
    publicUrl: 'assets/', // 静态资源的 url ，默认为 '/'
    detailedReport: true
}

// eslint-disable-next-line no-unused-vars
const bundler = new Bundler(entryFiles, options)
