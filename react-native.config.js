// react-native.config.js;
module.exports = {
  project: {
    android: {},
    ios: {},
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    // Remove any entries like this
    "react-native-vector-icons": {
      platforms: {
        ios: null,
      },
    },
  },
};