const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        client: "./src/index.js"
    },
    target: "web",
    mode: "production",
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
        publicPath: "/"
    },
    // externals: [nodeExternals()],
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
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./manifest.vendor.json"),
            name: "vendor"
        })
        // new HtmlWebpackPlugin({
        //     title: "Custom template",
        //     filename: "layout.html",
        //     template: "!!prerender-loader?string!src/layout.html"
        // })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ie8: false,
                    output: {
                        comments: false
                    }
                },
                sourceMap: true,
                extractComments: false
            })
        ]
    }
};
