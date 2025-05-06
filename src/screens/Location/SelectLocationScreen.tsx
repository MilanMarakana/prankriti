import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import CommonBtn from '../../components/UIComponent/commonBtn';
import CommonInput from '../../components/UIComponent/CommonInput';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useLocationStore} from '../../store/locationStore';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {Region} from 'react-native-maps';

// Define params locally
export type SelectLocationParams = {
  latitude?: number;
  longitude?: number;
  manual?: boolean;
  searchText?: string;
  region?: Region;
};

const RECENT_SEARCHES = [
  {
    title: 'Indira Nagar',
    subtitle: '4th Main Rd, Indira Nagar, Adyar, Chennai, Tamil Nadu',
  },
  {
    title: 'Koramangala',
    subtitle: '80 Feet Rd, Koramangala, Bengaluru, Karnataka 560034',
  },
  {
    title: 'Bandra West',
    subtitle: 'Linking Rd, Bandra West, Mumbai, Maharashtra 400050',
  },
  {
    title: 'Connaught Place',
    subtitle: 'Rajiv Chowk, Connaught Place, New Delhi, Delhi 110001',
  },
  {
    title: 'Mahalaxmi',
    subtitle: 'Mahalaxmi Rd, Mahalaxmi, Mumbai, Maharashtra 400011',
  },
  {
    title: 'Jayanagar',
    subtitle: 'Jayanagar 4th Block, Jayanagar, Bengaluru, Karnataka 560011',
  },
];

const GOOGLE_MAPS_API_KEY = 'AIzaSyBHmAdy8oCV1hv5AQTdwcv4q6wz-tenXlQ'; // Replace with your real key or use env variable

const SelectLocationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<
      RouteProp<{SelectLocation: SelectLocationParams}, 'SelectLocation'>
    >();
  const {
    hasPermission,
    currentLocation,
    requestPermission,
    getCurrentLocation,
  } = useLocationStore();

  const [address, setAddress] = useState<string | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);

  // When currentLocation changes, fetch the address
  useEffect(() => {
    if (currentLocation) {
      setAddress(null);
      setAddressLoading(true);
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.latitude},${currentLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`,
      )
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress(null);
          }
        })
        .catch(() => setAddress(null))
        .finally(() => setAddressLoading(false));
    }
  }, [currentLocation]);

  // Only update store from route params if not manual
  useEffect(() => {
    if (route.params?.manual) {
      return;
    }
    if (route.params?.latitude && route.params?.longitude) {
      useLocationStore.setState({
        currentLocation: {
          latitude: route.params.latitude,
          longitude: route.params.longitude,
        },
      });
    }
  }, [route.params]);

  // Handler for tapping the allow location access box
  const handleAllowLocationAccess = async () => {
    const granted = await requestPermission();
    if (granted) {
      const location = await getCurrentLocation();
      if (!location) {
        Alert.alert('Error', 'Unable to fetch your current location.');
      }
    } else {
      Alert.alert(
        'Permission required',
        'Location permission is required to access your location.',
      );
    }
  };

  const renderLocationBox = () => {
    if (hasPermission && currentLocation) {
      return (
        <View style={styles.locationBox}>
          <Ionicons
            name="location"
            size={22}
            color={COLORS.LIGHT_WHITE}
            style={styles.locationIcon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.locationBoxTitle}>Current Location</Text>
            {addressLoading ? (
              <ActivityIndicator
                size="small"
                color={COLORS.LIGHT_WHITE}
                style={{marginTop: 4}}
              />
            ) : address ? (
              <Text style={styles.locationBoxSubtitle}>{address}</Text>
            ) : null}
          </View>
        </View>
      );
    }

    // If manual param is set, show the allow location access box as a button
    if (route.params?.manual) {
      return (
        <TouchableOpacity
          style={styles.locationBox}
          onPress={handleAllowLocationAccess}>
          <Ionicons
            name="location-outline"
            size={22}
            color={COLORS.LIGHT_WHITE}
            style={styles.locationIcon}
          />
          <View style={{flex: 1}}>
            <Text style={styles.locationBoxTitle}>Allow location access</Text>
            <Text style={styles.locationBoxSubtitle}>
              Unable to detect your current location
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.locationBox}>
        <Ionicons
          name="location-outline"
          size={22}
          color={COLORS.LIGHT_WHITE}
          style={styles.locationIcon}
        />
        <View style={{flex: 1}}>
          <Text style={styles.locationBoxTitle}>Allow location access</Text>
          <Text style={styles.locationBoxSubtitle}>
            Unable to detect your current location
          </Text>
        </View>
      </View>
    );
  };

  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Feather name="chevron-down" size={24} color={COLORS.LIGHT_WHITE} />
          <Text style={styles.title}>Your current location</Text>
        </View>
        <CommonInput
          placeholder="Search city, area or locality"
          leftIcon={
            <Ionicons name="search" size={20} color={COLORS.LIGHT_GRAY} />
          }
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
        />
        {renderLocationBox()}
        <View style={styles.recentHeaderRow}>
          <Text style={styles.recentTitle}>Recent searches</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={RECENT_SEARCHES}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.recentItem}>
              <Ionicons
                name="time-outline"
                size={20}
                color={COLORS.LIGHT_WHITE}
                style={styles.recentIcon}
              />
              <View style={styles.recentTextContainer}>
                <Text style={styles.recentItemTitle}>{item.title}</Text>
                <Text style={styles.recentItemSubtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>
              <AntDesign name="right" size={18} color={COLORS.LIGHT_GRAY} />
            </TouchableOpacity>
          )}
          style={styles.recentList}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.bottomContainer}>
          <CommonBtn
            title="Continue"
            onPress={() => {
              navigation.navigate('MapLocation', {
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
                manual: route.params?.manual,
                searchText: route.params?.searchText,
                region: route.params?.region,
              });
            }}
            style={styles.continueBtn}
            textStyle={styles.continueBtnText}
          />
        </View>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: SCREEN_HEIGHT * 0.08,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    // marginBottom: SCREEN_HEIGHT * 0.02,
  },
  searchInputContainer: {
    borderRadius: 16,
    backgroundColor: COLORS.GRAY,
    borderColor: 'transparent',
    marginBottom: SCREEN_HEIGHT * 0.02,
    height: SCREEN_HEIGHT * 0.065,
  },
  searchInput: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: COLORS.LIGHT_GRAY_3,
    borderWidth: 1,
    borderRadius: 14,
    padding: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  locationIcon: {
    marginRight: SCREEN_WIDTH * 0.03,
  },
  locationBoxTitle: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  locationBoxSubtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    marginTop: 2,
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  recentTitle: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  seeAll: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    textDecorationLine: 'underline',
  },
  recentList: {
    flexGrow: 0,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.012,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY_3,
  },
  recentIcon: {
    marginRight: SCREEN_WIDTH * 0.03,
  },
  recentTextContainer: {
    flex: 1,
  },
  recentItemTitle: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  recentItemSubtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  bottomContainer: {
    marginTop: 'auto',
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  continueBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    height: SCREEN_HEIGHT * 0.065,
  },
  continueBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default SelectLocationScreen;
