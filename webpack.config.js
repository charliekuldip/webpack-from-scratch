const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'output.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // files ending with .js
                exclude: /node_modules/, // exclude node_modules directory
                loader: "babel-loader" // use this (babel-core) loader
            },
            {
                test: /\.scss$/, // files ending with .scss
                use: ExtractTextWebpackPlugin.extract({ // call our plugin with exract method
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                }) // end extract
            }
        ] // end rules
    },
    plugins: [
        new ExtractTextWebpackPlugin('styles.css') // call the Plugin contructor and name our css file
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './public'), // a dir or URL to serve HTML content
        historyApiFallback: true, // fallback to /index.html for SPA
        inline: true, // inline mode (set to false to disable including client scripts like live reload)
        open: true // open default browser while lanuching
    },
    devtool: 'eval-source-map' // enable devtool for better debugging experience
}

module.exports = config;
