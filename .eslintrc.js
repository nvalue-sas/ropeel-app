module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  plugins: ['import', 'react-hooks'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@assets': './src/assets',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@navigations': './src/navigations',
          '@redux': './src/redux',
          '@scenes': './src/scenes',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
