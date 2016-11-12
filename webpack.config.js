var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname +'/app',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],

    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/view/index.html', to: 'index.html' },
            { from: './src/view/numbers.jpg', to: 'numbers.jpg' }
        ])]
};