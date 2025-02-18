const chromaticTestStories = ['../src/**/*.stories.spec.@(js|mdx)'];
const storybookStories = ['./**/*.stories.@(js|mdx)', '../src/**/*.stories.@(js|mdx)'];

module.exports = {
  stories: process.env.CHROMATIC ? chromaticTestStories : storybookStories,
  addons: [
    '@storybook/addon-backgrounds',
    'storybook-addon-designs',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
        cssLoaderOptions: {
          sourceMap: true,
          modules: {
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
          importLoaders: 1,
        },
      },
    },
  ],
};
