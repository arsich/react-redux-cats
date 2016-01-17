var path = require('path');
var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var pkg = require('./package.json');
var Clean = require('clean-webpack-plugin');

var autoprefixer = require('autoprefixer');

var TARGET = process.env.npm_lifecycle_event;

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


process.env.BABEL_ENV = TARGET;

var common = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: APP_PATH
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss'],
                include: APP_PATH
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new HtmlWebPackPlugin(
            {
                title: 'Cats finder app',
                template: 'index-template.html',
                inject: 'body'
            }
        )
    ]
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        devtool: 'source-map',
        entry: {
            app: APP_PATH,
            vendor: Object.keys(pkg.dependencies)
        },
        output: {
            path: BUILD_PATH,
            filename: '[name].[chunkhash].js?'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    // This affects react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.CommonsChunkPlugin(
                'vendor',
                '[name].[chunkhash].js'
            ),
            new Clean(['build'])
        ]
    });
}