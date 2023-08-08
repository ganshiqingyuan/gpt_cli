/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { DefinePlugin } = require('webpack');
// BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        chunkFilename: '[hash].[name].js',
    },
    optimization: {
        splitChunks: {
            minSize: 1,
            minChunks: 1,
            maxAsyncRequests: 10,
            chunks: 'async',
        },
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, '../components/'),
            static: path.resolve(__dirname, '../static/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true,
        }),
        // new BundleAnalyzerPlugin(),
        new DefinePlugin({
            'process.env': {
                env: '"' + 'prod' + '"',
            },
        }),
    ],
};
