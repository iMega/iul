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
                corejs: 3,
                useBuiltIns: "usage",
                targets: {
                    node: "current"
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
        "@babel/plugin-proposal-object-rest-spread",
        "transform-react-remove-prop-types"
    ]
};
