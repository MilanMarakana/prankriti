import {create} from 'zustand';
import {Platform, Alert} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

interface LocationState {
  hasPermission: boolean;
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  checkPermission: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<{
    latitude: number;
    longitude: number;
  } | null>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  hasPermission: false,
  currentLocation: null,
  isLoading: false,
  error: null,

  setLoading: (isLoading: boolean) => set({isLoading}),
  setError: (error: string | null) => set({error}),

  checkPermission: async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        set({error: 'Platform not supported'});
        return;
      }

      const result = await check(permission);
      const hasPermission = result === RESULTS.GRANTED;
      set({hasPermission, error: null});
    } catch (error) {
      console.error('Error checking permission:', error);
      set({error: 'Failed to check location permission'});
    }
  },

  requestPermission: async () => {
    set({isLoading: true, error: null});
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        set({error: 'Platform not supported'});
        return false;
      }

      const result = await request(permission);
      const granted = result === RESULTS.GRANTED;
      set({hasPermission: granted, error: null});

      if (!granted) {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services in your device settings to use this feature.',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
        );
      }
      return granted;
    } catch (error) {
      console.error('Error requesting permission:', error);
      set({error: 'Failed to request location permission'});
      Alert.alert(
        'Error',
        'Failed to request location permission. Please try again.',
      );
      return false;
    } finally {
      set({isLoading: false});
    }
  },

  getCurrentLocation: async () => {
    const {hasPermission} = get();

    if (!hasPermission) {
      const granted = await get().requestPermission();
      if (!granted) {
        return null;
      }
    }

    set({isLoading: true, error: null});

    try {
      return await new Promise<{latitude: number; longitude: number} | null>(
        (resolve, reject) => {
          Geolocation.getCurrentPosition(
            position => {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              set({currentLocation: location, error: null});
              resolve(location);
            },
            error => {
              console.error('Location error:', error);
              const errorMessage =
                error.code === 1
                  ? 'Location permission denied'
                  : error.code === 2
                  ? 'Location unavailable'
                  : 'Failed to get current location';

              set({error: errorMessage});
              Alert.alert(
                'Location Error',
                'Unable to get your current location. Please try again or select location manually.',
              );
              reject(error);
            },
            {
              // enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        },
      );
    } catch (error) {
      console.error('Location error:', error);
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
