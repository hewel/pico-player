const Bundler = require('parcel-bundler')
const Path = require('path')

const entryFiles = Path.join(__dirname, './src/index.html')

const options = {
    detailedReport: true
}

const bundler = new Bundler(entryFiles, options)
