import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import CommonBtn from '../../components/UIComponent/commonBtn';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useLocationStore} from '../../store/locationStore';

const GetStartWithLocScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    hasPermission,
    isLoading,
    checkPermission,
    requestPermission,
    getCurrentLocation,
    error,
    setLoading,
    setError,
  } = useLocationStore();

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        await checkPermission();
        if (!hasPermission) {
          await requestPermission();
        }
      } catch (err) {
        console.error('Error initializing location:', err);
        Alert.alert(
          'Error',
          'Failed to initialize location services. Please try again.',
        );
      }
    };
    initializeLocation();
  }, [checkPermission, requestPermission, hasPermission]);

  const handleUseCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!hasPermission) {
        const permissionGranted = await requestPermission();
        if (!permissionGranted) {
          Alert.alert(
            'Location Permission Required',
            'Please enable location services in your device settings to use this feature.',
          );
          return;
        }
      }

      const location = await getCurrentLocation();
      if (location) {
        navigation.navigate('SelectLocation', {
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    } catch (err) {
      console.error('Error getting location:', error, err);
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please try again or select location manually.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocationManually = () => {
    navigation.navigate('SelectLocation', {manual: true});
  };

  return (
    <MostCommonLayout showLogo={true} logoStyle={styles.logo}>
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/location-hero.png')}
            style={styles.hero}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bottomContainer}>
          <CommonBtn
            title={isLoading ? 'Loading...' : 'Use current location'}
            onPress={handleUseCurrentLocation}
            style={[
              styles.primaryBtn,
              (!hasPermission || error) && styles.disabledBtn,
            ]}
            textStyle={styles.primaryBtnText}
            isDisabled={isLoading || !hasPermission || !!error}
          />
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={handleSelectLocationManually}>
            <Text style={styles.secondaryBtnText}>
              Select location manually
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: SCREEN_HEIGHT * 0.04,
  },
  logo: {
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_HEIGHT * 0.07,
    marginBottom: SCREEN_HEIGHT * 0.04,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  hero: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryBtn: {
    width: '90%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    marginBottom: SCREEN_HEIGHT * 0.01,
    height: SCREEN_HEIGHT * 0.065,
  },
  disabledBtn: {
    backgroundColor: COLORS.GRAY,
  },
  primaryBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
  secondaryBtn: {
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  secondaryBtnText: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.md,
    textDecorationLine: 'underline',
  },
});

export default GetStartWithLocScreen;
