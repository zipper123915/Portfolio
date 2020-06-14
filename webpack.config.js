const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            jquery: 'jquery',
            'window.jquery': 'jquery',
            $: 'jquery',
            'window.$': 'jquery'
        })
    ],
    
    entry: {
        main: './src/js/index.js'
    },
    
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader')
                }
            }
        ]
    },
    
    resolve: {
        alias: {
            '%modules%': path.resolve(__dirname, 'src/blocks/modules'),
            '~': path.resolve(__dirname, 'src/')
        }
    }
};
