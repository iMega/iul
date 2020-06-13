module.exports = {
    stories: [
        "../src/Intro.stories.mdx",
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.js"
    ],
    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-viewport/register"
    ]
};
