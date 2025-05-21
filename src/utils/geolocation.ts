import Geolocation from '@react-native-community/geolocation';

export const initializeGeolocation = () => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
    enableBackgroundLocationUpdates: true,
  });
};
