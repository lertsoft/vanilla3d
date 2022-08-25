const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/counter.js'),
    output:
    {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
        // mode: 'development',
        devtool: 'source-map',
        plugins:[
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                minify: true
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new MiniCSSExtractPlugin()
            // new CopyWebpackPlugin({
            //     patterns: [
            //         { from: path.resolve(__dirname, '../static') }
            //     ]
            // }),
        
        ],
        module: {
            rules: [
                 // HTML
            {
                test: /\.(html)$/,
                use:
                [
                    'html-loader'
                ]
            },
 
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
 
            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
 
            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/images/'
                        }
                    }
                ]
            },
            
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/fonts/'
                        }
                    }
                ]
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                    use: [
                        'raw-loader'
                        ]
            }
            
        ]
    }
};
