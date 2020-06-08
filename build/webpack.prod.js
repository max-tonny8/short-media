const baseConfig = require("./webpack.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]_[chunkhash:8].css',
            chunkFilename: '[id].css',
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: true? {map: { inline: false }}:{}
        })
    ],
    optimization: {
        usedExports: true,
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true? {map: { inline: false }}:{}
            })
        ],
        splitChunks: {
            chunks: "all",
            minChunks: 1,
            minSize: 0
        }
    }
});