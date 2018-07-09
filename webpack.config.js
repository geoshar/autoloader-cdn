let path = require('path');
let env = process.env.NODE_ENV;
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: env,
    devtool: (env === "production") ? 'source-map' : 'inline-source-map',
    entry: {
        autoloader_cdn: './src/autoloader_cdn.js',
        "autoloader_cdn.min": './src/autoloader_cdn.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
        library: "[name]",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    plugins: [new CleanWebpackPlugin('dist')],
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    },
};
