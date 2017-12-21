const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

// SET THEME OPTIONS
const themeOptions = require('./theme.config.js');

const wConfig = function(themes) {
    let configs = [];

    themes.forEach(function(currentTheme) {

        // SCSS IMPORTS - USED FOR CUSTOM THEMES TO USE CORRESPONDING VARS
        let scssImports = [
            "@import 'vars/_common.scss';",
            "@import 'vars/_"+currentTheme+".scss';"
        ];

        let config = {
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, './public'),
                filename: 'js/' + currentTheme + '/output.js'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // exclude node_modules directory
                        loader: "babel-loader" // use this (babel-core) loader
                    },
                    {
                        test: /\.scss$/,
                        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({ 
                            use: [{
                                    loader: 'css-loader'
                                }, {
                                    loader: 'sass-loader',
                                    options: {
                                        data: scssImports.join(' ')
                                    }
                                }, {
                                    loader: 'postcss-loader'
                                }],
                            fallback: 'style-loader'
                        })) // end extract
                    }
                ] // end rules
            },
            plugins: [
                new ExtractTextWebpackPlugin('css/' + currentTheme + '/_styles.css'),
                new webpack.DefinePlugin({
                    'CURRENT_THEME': JSON.stringify(currentTheme)
                })
            ],
            devServer: {
                contentBase: path.resolve(__dirname, './public'), // a dir or URL to serve HTML content
                historyApiFallback: true, // fallback to /index.html for SPA
                inline: true, // inline mode (set to false to disable including client scripts like live reload)
                open: true // open default browser while lanuching
            },
            devtool: 'eval-source-map' // enable devtool for better debugging experience
        }

        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new webpack.optimize.UglifyJsPlugin(), // call uglify js
                new OptimizeCSSAssets() // optimize css
            );
        }

        configs.push(config);
    });
    return configs;
}

module.exports = wConfig(themeOptions.allThemes);
