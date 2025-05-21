import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useLocationStore} from '../../../store/locationStore';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {FONT_SIZE, SCREEN_WIDTH} from '../../../constants/responsive';
import BellIcon from '../../../assets/svg/notification-bing.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationService from '../../../services/locationService';
import LocationIcon from '../../../assets/svg/location.svg';

export default function TopBar() {
  const {
    currentLocation,
    isLoading,
    checkPermission,
    getCurrentLocation,
    hasPermission,
  } = useLocationStore();

  const [address, setAddress] = useState<string | null>(null);
  const [addressLoading, setAddressLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await checkPermission();
    })();
  }, [checkPermission]);

  useEffect(() => {
    if (hasPermission && !currentLocation) {
      getCurrentLocation();
    }
  }, [hasPermission, currentLocation, getCurrentLocation]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (currentLocation) {
        setAddressLoading(true);
        const addr = await LocationService.getAddressFromCoordinates(
          currentLocation,
        );
        setAddress(addr);
        setAddressLoading(false);
      } else {
        setAddress(null);
      }
    };
    fetchAddress();
  }, [currentLocation]);

  let locationText = 'Fetching location...';
  if (addressLoading || isLoading) {
    locationText = 'Fetching location...';
  } else if (address) {
    locationText = address;
  } else if (currentLocation) {
    locationText = `${currentLocation.latitude.toFixed(
      2,
    )}, ${currentLocation.longitude.toFixed(2)}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.rowWrap}>
          <LocationIcon width={20} height={20} />
          <Text style={styles.title}>Home</Text>
          <Ionicons
            name="chevron-down-outline"
            size={18}
            color={COLORS.WHITE}
            style={styles.dropdownIcon}
          />
        </View>
        <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
          {locationText}
        </Text>
      </View>
      <TouchableOpacity style={styles.bellWrap}>
        <View style={styles.bellCircle}>
          <BellIcon width={22} height={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_WIDTH * 0.02,
    paddingHorizontal: 8,
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  locationIcon: {
    marginRight: 4,
  },
  dropdownIcon: {
    marginLeft: 2,
    marginTop: 1,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
  location: {
    color: COLORS.SUB_TEXT,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
    maxWidth: SCREEN_WIDTH * 0.45,
  },
  bellWrap: {
    padding: 4,
  },
  bellCircle: {
    backgroundColor: COLORS.GRAY,
    borderWidth: 0.5,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
