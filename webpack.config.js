let path = require('path');
let env = process.env.NODE_ENV;
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: env,
    devtool: (env === "production") ? 'source-map' : 'inline-source-map',
    entry: {
        "autoloader.cdn": './src/autoloader.cdn.js',
        "autoloader.cdn.min": './src/autoloader.cdn.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
        library: "autoloaderCdn",
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
