/*module.exports = function (api) {
  //api.cache(true);
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _utils: './src/utils'
        },
        cwd: 'babelrc'
      }
    ]
  ];
  return {
    presets,
    plugins
  };
}*/
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
