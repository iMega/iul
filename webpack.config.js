const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./webpack.tet.plugin");
const HelloCompilationPlugin = require("./webpack.tet2.plugin");

module.exports = {
    entry: {
        main: "./src/Main.js"
    },
    target: "web",
    mode: "production",
    output: {
        filename: "[name]-[chunkhash].js",
        path: __dirname + "/dist",
        publicPath: "/"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Custom template",
            filename: "layout.html",
            template: "!!prerender-loader?string!src/layout.html"
        }),
        new FileListPlugin(),
        new HelloCompilationPlugin()
    ],
    optimization: {
        minimize: true
    }
};
