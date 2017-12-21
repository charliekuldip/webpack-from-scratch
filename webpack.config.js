const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');


const themeOptions = require('./theme.config.js');

const scssImports = [
    "@import 'vars/_common.scss';",
    "@import 'vars/_"+themeOptions.name+".scss';"
];

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'output.js'
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
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/assets/images/&name=images[path][name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        }
                    }
                }],
                exclude: /node_modules/,
                include: __dirname
            }
        ] // end rules
    },
    plugins: [
        new ExtractTextWebpackPlugin('styles.css') // call the Plugin contructor and name our css file + theme name
        // new ExtractTextWebpackPlugin(themeOptions.dir + '/' + themeOptions.name + '_styles.css')
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

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(), // call uglify js
        new OptimizeCSSAssets() // optimize css
    );
}