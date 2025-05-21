import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useHomeStore} from '../../../store/homeStore';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {FONT_SIZE, SCREEN_WIDTH} from '../../../constants/responsive';
import LocationIcon from '../../../assets/svg/location.svg';

export default function Weather() {
  const weather = useHomeStore(s => s.weather);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Weather</Text>
        <View style={styles.cityRow}>
          <LocationIcon width={20} height={20} />
          <Text style={styles.city}>{weather.city}</Text>
        </View>
        <View style={styles.tempRow}>
          <Text style={styles.temp}>{weather.temperature}°</Text>
          <Text style={styles.desc}>{weather.description}</Text>
        </View>
      </View>
      <Image
        source={require('../../../assets/images/weather.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.045,
    marginBottom: SCREEN_WIDTH * 0.04,
    minHeight: 110,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.md,
    marginBottom: 5,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 4,
  },
  city: {
    color: COLORS.SUB_TEXT,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  temp: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xlt,
    marginRight: 8,
  },
  desc: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.sm,
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
