module.exports = {
    project: {
      ios: {},
      android: {
        unstable_reactLegacyComponentNames: [
          'AIRGoogleMap',
          'AIRMap',
          'AIRMapMarker',
          'PanoramaView'
        ],
      },
    },
    assets: ['./src/assets/fonts'],
  };