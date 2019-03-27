const Bundler = require('parcel-bundler')
const Path = require('path')

const entryFiles = Path.join(__dirname, './src/index.html')

const options = {
    scopeHoist: true,
    https: true,
    logLevel: 5,
    detailedReport: true
};

(async () => {
    // eslint-disable-next-line no-unused-vars
    const bundler = new Bundler(entryFiles, options)
})()
