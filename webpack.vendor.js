const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const pathToLibrary = name => path.resolve(__dirname, `./node_modules/${name}`);

module.exports = {
    target: "web",
    mode: "production",
    resolve: {
        alias: {
            "apollo-utilities": pathToLibrary("apollo-utilities"),
            "core-js": pathToLibrary("core-js"),
            "prop-types": pathToLibrary("prop-types"),
            "hoist-non-react-statics": pathToLibrary("hoist-non-react-statics"),
            "@emotion/memoize": pathToLibrary("@emotion/memoize"),
            "@emotion/stylis": pathToLibrary("@emotion/stylis"),
            "@emotion/hash": pathToLibrary("@emotion/hash")
        }
    },
    entry: {
        vendor: [
            // react
            "react",
            "react-dom",

            // graphql
            "graphql",
            "graphql-anywhere",
            // ],
            // vendor1: [
            // apollo
            "@apollo/client",
            "apollo-link-rest",
            "apollo-link",
            "node-fetch",
            // ],
            // vendor2: [
            // emotion
            "@emotion/styled",
            "@emotion/styled-base",
            "emotion",

            // component
            "buildo-react-components/lib/RadioGroup",
            "buildo-react-components/lib/Input",

            //uploader
            "html5-file-selector",
            "react-autosize-textarea",
            "react-dropzone-uploader"
        ]
    },
    output: {
        filename: "[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, "manifest.vendor.json"),
            name: "[name]"
        }),
        new webpack.HashedModuleIdsPlugin({})
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
    },
    stats: { maxModules: Infinity, exclude: undefined }
};
