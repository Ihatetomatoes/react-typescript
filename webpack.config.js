var webpack = require('webpack');
var ForkCheckerPlugin = require('awesome-typescript-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var config = {
    app: ['./src/index.tsx'],
    tsxLoaders: ['babel-loader','awesome-typescript-loader']
}

var dev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: config.app
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.webpack.js', '.scss']
    },
    devServer: {
        port: 8080,
        stats: 'errors-only'
    },
    devtool: 'source-map',
    module: {
        loaders: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: config.tsxLoaders
        },
        {
            test: /mobx-react-devtools/,
            use: dev ? 'noop' : 'null'
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader?modules&camelCase', 'sass-loader']
            })
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React with TypeScript Starter Kit',
            template: './src/index.ejs'
        }),
        new (webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("styles.css")
    ]
};