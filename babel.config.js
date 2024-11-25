module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './assets/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@service': './src/service',
          '@states': './src/states',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
