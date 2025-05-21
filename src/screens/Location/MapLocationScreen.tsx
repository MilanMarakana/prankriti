import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
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
import {RootStackParamList} from '../../types/navigation';
import {SelectLocationParams} from '../../types/location';
import locationService from '../../services/locationService';

// Google Maps dark style
const MAP_DARK_STYLE = [
  {elementType: 'geometry', stylers: [{color: '#212121'}]},
  {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#757575'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#212121'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{color: '#757575'}],
  },
  {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#181818'}]},
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#181818'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#1b1b1b'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#2c2c2c'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8a8a8a'}],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#373737'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#3c3c3c'}],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#4e4e4e'}],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f2f2f'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#000000'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#3d3d3d'}],
  },
];

const INITIAL_REGION: Region = {
  latitude: 19.0968,
  longitude: 72.8517,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const REFERENCE_PINCODE = '400022';
const SERVICE_RADIUS_KM = 10;

const MapLocationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{MapLocation: SelectLocationParams}, 'MapLocation'>>();

  const [search, setSearch] = useState(route?.params?.searchText || '');
  const [region, setRegion] = useState<Region>(
    route?.params?.region || INITIAL_REGION,
  );
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const [referenceCoords, setReferenceCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isServicable, setIsServicable] = useState(true);

  const fetchAddress = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      await locationService.getAddressFromCoordinates({
        latitude: lat,
        longitude: lng,
      });
    } catch (e) {
      console.error('Error fetching address:', e);
    } finally {
      setLoading(false);
    }
  };

  const onRegionChangeComplete = (reg: Region) => {
    setRegion(reg);
    fetchAddress(reg.latitude, reg.longitude);
  };

  useEffect(() => {
    fetchAddress(region.latitude, region.longitude);
  }, [region.latitude, region.longitude]);

  useEffect(() => {
    const fetchReferenceCoords = async () => {
      try {
        const result = await locationService.getCoordinatesFromPostalCode(
          REFERENCE_PINCODE,
        );
        if (result) {
          setReferenceCoords({
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          });
        }
      } catch (error) {
        console.error('Error fetching reference coordinates:', error);
      }
    };
    fetchReferenceCoords();
  }, []);

  useEffect(() => {
    if (referenceCoords) {
      const dist = locationService.calculateDistance(
        region.latitude,
        region.longitude,
        referenceCoords.lat,
        referenceCoords.lng,
      );
      setIsServicable(dist <= SERVICE_RADIUS_KM);
    }
  }, [region, referenceCoords]);

  const handlePostalCodeSearch = async (postalCode: string) => {
    try {
      const result = await locationService.getCoordinatesFromPostalCode(
        postalCode,
      );
      if (result) {
        const newRegion = {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      } else {
        Alert.alert('No location found for this postal code.');
      }
    } catch (e) {
      Alert.alert('Failed to find location. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        customMapStyle={MAP_DARK_STYLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        zoomControlEnabled={false}
        toolbarEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={true}
        loadingEnabled={true}>
        <Marker coordinate={region} draggable={true}>
          <View style={styles.pin} />
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlayContainer} pointerEvents="box-none">
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.LIGHT_WHITE} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter your area pin code</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.LIGHT_WHITE}
            style={{marginLeft: 10, marginRight: 8}}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Try 395765"
            placeholderTextColor={COLORS.LIGHT_WHITE}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => handlePostalCodeSearch(search)}
          />
        </View>
      </SafeAreaView>

      <View style={styles.pinAddressContainer} pointerEvents="none">
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            {loading
              ? 'Loading...'
              : isServicable
              ? 'Service will be provided here'
              : 'Service will not be provided here'}
          </Text>
          <Text style={styles.addressSubText}>
            Move the pin to change location
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => {
          navigation.navigate('SuccessLocation', {
            serviceable: isServicable,
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
    backgroundColor: '#181818',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 0,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    paddingTop: SCREEN_HEIGHT * 0.04,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(60,60,60,1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitle: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    textShadowColor: COLORS.DARK,
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(60,60,60,1)',
    borderRadius: 12,
    height: SCREEN_HEIGHT * 0.06,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  searchInput: {
    flex: 1,
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    marginLeft: 4,
  },
  pinAddressContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.42,
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
    borderColor: '#232323',
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
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },
  addressSubText: {
    color: COLORS.GRAY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
    marginTop: 2,
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
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default MapLocationScreen;
