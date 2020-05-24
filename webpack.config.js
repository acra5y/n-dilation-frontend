const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
    entry: "./app/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist/public"),
        publicPath: "/dist/public",
        filename: "main.js",
        library: "app"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx",]
    },
    plugins: [
        new CopyPlugin([
            { from: "wasm", to: "wasm" },
        ]),
        new CompressionPlugin({
            include: /(main\.js)|(main\.wasm)$/
        }),
        new BrotliPlugin({
            test: /(main\.js)|(main\.wasm)$/,
        })
    ],
};
