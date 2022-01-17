const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'script.[contenthash].bundle.js',
        assetModuleFilename: 'images/[name].[ext]',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                      }
                }
            }
        ]
    },

    plugins: [
        new cleanWebpackPlugin.CleanWebpackPlugin(),
        new htmlWebpackPlugin({template: './index.html'}),
        new miniCssExtractPlugin({filename: '[name].[contenthash].bundle.css'}),
        new CssMinimizerPlugin()
    ],

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new terserPlugin()],
    },

    mode: 'development',
    devtool: false
}