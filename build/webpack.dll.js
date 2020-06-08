const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    name: "production",
    entry: {
        framework: [
            "redux",
            "react-redux",
            "react", 
            "react-dom"
        ]
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, "../dll"),
        library: "_dll_[name]"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DllPlugin({
            name: "_dll_[name]",
            path: path.resolve(__dirname, "../dll", "[name].manifest.json")
        })

    ]
};