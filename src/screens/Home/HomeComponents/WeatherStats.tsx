import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useHomeStore} from '../../../store/homeStore';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {FONT_SIZE, SCREEN_WIDTH} from '../../../constants/responsive';

export default function WeatherStats() {
  const weather = useHomeStore(s => s.weather);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.statCol}>
          <Image
            source={require('../../../assets/images/wind.png')}
            style={styles.icon}
          />
          <Text style={styles.value}>{weather.wind}</Text>
          <Text style={styles.label}>Wind</Text>
        </View>
        <View style={styles.statCol}>
          <Image
            source={require('../../../assets/images/humidity.png')}
            style={styles.icon}
          />
          <Text style={styles.value}>{weather.humidity}</Text>
          <Text style={styles.label}>Humidity</Text>
        </View>
        <View style={styles.statCol}>
          <Image
            source={require('../../../assets/images/rain.png')}
            style={styles.icon}
          />
          <Text style={styles.value}>{weather.rain}</Text>
          <Text style={styles.label}>Rain</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 20,
    paddingVertical: SCREEN_WIDTH * 0.06,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    // marginBottom: SCREEN_WIDTH * 0.04,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  value: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.sm,
  },
  label: {
    color: COLORS.LIGHT_GRAY_4,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
});
