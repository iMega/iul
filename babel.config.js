module.exports = {
    env: {
        production: {
            plugins: [["emotion", { hoist: true }]]
        },
        development: {
            plugins: [["emotion", { sourceMap: true, autoLabel: true }]]
        }
    },
    presets: [
        [
            "@babel/preset-env",
            {
                corejs: { version: 3, proposals: false },
                useBuiltIns: "entry",
                targets: {
                    node: "current",
                    browsers: [
                        "Chrome >= 71",
                        "iOS >= 11",
                        "Safari >= 11",
                        "Firefox >= 60"
                    ]
                }
            }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-react-jsx",
        [
            "babel-plugin-graphql-tag",
            {
                strip: true
            }
        ],
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        "@babel/plugin-transform-runtime",
        // [
        //     "@babel/plugin-proposal-object-rest-spread",
        //     { loose: false, useBuiltIns: true }
        // ],
        "transform-react-remove-prop-types"
    ]
};
