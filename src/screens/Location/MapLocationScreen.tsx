import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Region, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AppNavigator';

// Define params locally
export type SelectLocationParams = {
  latitude?: number;
  longitude?: number;
  manual?: boolean;
  searchText?: string;
  region?: Region;
};

const INITIAL_REGION: Region = {
  latitude: 28.6139, // Default to New Delhi
  longitude: 77.209,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const MapLocationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{MapLocation: SelectLocationParams}, 'MapLocation'>>();

  const [search, setSearch] = useState(route?.params?.searchText || '');
  const [region, setRegion] = useState<Region>(
    route?.params?.region || INITIAL_REGION,
  );
  const [address, setAddress] = useState('Service will be provided here');
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView | null>(null);

  // Fetch address from Google Maps Geocoding API
  const fetchAddress = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const GOOGLE_MAPS_API_KEY = 'AIzaSyBHmAdy8oCV1hv5AQTdwcv4q6wz-tenXlQ'; // Replace with your real key
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Service will be provided here');
      }
    } catch (e) {
      setAddress('Service will be provided here');
    } finally {
      setLoading(false);
    }
  };

  const onRegionChangeComplete = (reg: Region) => {
    setRegion(reg);
    fetchAddress(reg.latitude, reg.longitude);
  };

  // Fetch address when region changes
  React.useEffect(() => {
    fetchAddress(region.latitude, region.longitude);
  }, [region.latitude, region.longitude]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.LIGHT_WHITE}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter your area pin code"
          placeholderTextColor={COLORS.LIGHT_GRAY}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Map */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        <Marker coordinate={region} draggable={true} />
      </MapView>
      {/* Pin and Address */}
      <View style={styles.pinContainer} pointerEvents="none">
        <View style={styles.pin} />
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            {loading ? 'Loading...' : address}
          </Text>
        </View>
      </View>
      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => {
          navigation.navigate('SelectLocation', {
            latitude: region.latitude,
            longitude: region.longitude,
            manual: route.params?.manual,
            searchText: search,
            region: region,
          });
        }}>
        <Text style={styles.confirmBtnText}>Confirm location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    borderRadius: 16,
    marginTop: SCREEN_HEIGHT * 0.05,
    marginHorizontal: SCREEN_WIDTH * 0.05,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    height: SCREEN_HEIGHT * 0.065,
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    marginLeft: 10,
  },
  map: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.7,
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  pinContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.45,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  pin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 4,
    borderColor: COLORS.DARK,
    alignSelf: 'center',
  },
  addressBox: {
    backgroundColor: COLORS.LIGHT_WHITE,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    marginTop: -40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addressText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },
  confirmBtn: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.04,
    left: SCREEN_WIDTH * 0.05,
    right: SCREEN_WIDTH * 0.05,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    height: SCREEN_HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  confirmBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default MapLocationScreen;
