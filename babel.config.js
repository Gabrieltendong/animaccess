module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ... other configs, if any
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@constants': './src/constants',
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
