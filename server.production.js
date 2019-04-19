const nodeExternals = require("webpack-node-externals");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./server/index.js",
    target: "node",
    node: {
        __dirname: true
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "server.js",
        library: "app",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            components: path.resolve(__dirname, "..", "app/components")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'production'`
            }
        })
    ]
};
