const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const naming = {
    css: 'app',
    javascript: 'app',
    build: 'build',
    version_one: 'v001'
}

const config = {

    entry: [
        "babel-polyfill",
        "./assets/js/app.js",
        "./assets/scss/app.scss"
    ],

    plugins: [
        new CleanWebpackPlugin([`${naming.build}`]),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: `css/${naming.css}.css`,
            allChunks: false,
            publicPath: `${naming.build}`
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9000,
            files: './**/*',
            server: {
                baseDir: './',
                index: "index.html"
            }
        })
    ],

    output: {
        filename: `js/${naming.javascript}.js`,
        path: __dirname + `/${naming.build}`,
        publicPath: `./${naming.build}`
    },

    /**
     * Sourcemaps
     */
    devtool: 'source-map',

    /**
     * Loaders
     */
    module: {
        rules: [

            /**
             * Cache Loader
             */
            {
                test: /\.ext$/,
                use: [
                    'cache-loader',
                    'babel-loader'
                ],
                include: path.resolve('assets')
            },

            /**
             * SASS Loader
             */
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', 
                        'sass-loader'
                    ]
                })
            },

            /**
             * Babel Loader
             */
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader'
                }
            },

            /**
             * Raw Loader
             */
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },

            /**
             * File loader - Images
             */
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[sha512:hash:base64:7].[ext]',
                            publicPath: './'
                        }  
                    }
                ]
            }
        ]
    },

    /**
     * Extensions that are used
     */
    resolve: {
        extensions: ['.js', '.css', '.scss', '.html', '.json']
    },

    /**
     * Watch
     */
    watch: true,
    
    /**
     * lets you precisely control what bundle information gets displayed
     */
    stats: { 
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },

    /**
     * Performance
     */
    performance: {
        hints: "warning", 
        maxAssetSize: 500000, 
        maxEntrypointSize: 1000000, 
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.scss') || assetFilename.endsWith('.js');
        }
    },

    /**
     * Capture timing information
     */
    profile: true,

    /**
     * Disable/Enable caching
     */
    cache: true,

};

module.exports = config;