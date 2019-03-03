const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./app/index.jsx",
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
        new HtmlWebPackPlugin({
        template: "./app/index.html",
        filename: "./index.html"
      })
    ]
};
