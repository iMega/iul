const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const pathToLibrary = name => path.resolve(__dirname, `./node_modules/${name}`);

module.exports = {
    target: "web",
    mode: "production",
    // mode: "development",
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
        // core: [
        //     "ts-invariant/lib/invariant.esm.js",
        //     "qs",
        //     "@babel/runtime/helpers/defineProperty.js",
        //     "@babel/runtime/helpers/extends.js",
        //     "@babel/runtime/helpers/inheritsLoose.js"
        // ],
        // react: ["react", "react-dom"],
        // graphql: ["graphql", "graphql-anywhere", "graphql-anywhere/lib/async"],
        // apollo: [
        //     "@apollo/client",
        //     "@apollo/client/core",
        //     "@apollo/client/utilities",
        //     "@apollo/client/react",
        //     "@apollo/client/react/components",
        //     "@apollo/client/react/hoc",
        //     "@apollo/client/react/parser",
        //     "apollo-link",
        //     "apollo-utilities",
        //     "apollo-link-rest"
        // ],
        // uuid: ["uuid"],
        // emotion: ["@emotion/core/dist/core.browser.esm.js"]
        // emotion: ["@emotion/styled"]
        vendor: [
            // react
            "react",
            "react-dom",
            // graphql
            "graphql",
            "graphql-anywhere",
            // apollo
            "@apollo/client",
            "apollo-link-rest",
            "apollo-link",
            "node-fetch",
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
        // new BundleAnalyzerPlugin(),
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, "manifest.[name].json"),
            name: "[name]",
            entryOnly: true,
            format: true
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
