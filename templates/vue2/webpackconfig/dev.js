/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './index.js',
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000',
            '/common': 'http://localhost:3002',
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
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
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
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
        new DefinePlugin({
            'process.env': {
                env: '"' + 'dev' + '"',
            },
        }),
    ],
};
