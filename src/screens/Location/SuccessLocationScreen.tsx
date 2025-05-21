import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';

const SuccessLocationScreen = ({navigation, route}: any) => {
  const {serviceable} = route?.params || {};
  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {serviceable ? 'Congratulations!' : "We're Excited Too!"}
        </Text>
        <Text style={styles.subtitle}>
          {serviceable
            ? 'Super, our team member shall visit your place within 24 hours'
            : 'We are as excited as you are. Purify your place. Unfortunately, all good things take time. We shall notify you once we are confident enough to cater to you in your location well.'}
        </Text>
        <Image
          source={
            serviceable
              ? require('../../assets/images/serviceable.png')
              : require('../../assets/images/not-serviceable.png')
          }
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (serviceable) {
              navigation.navigate('Subscribe');
            } else {
              navigation?.goBack?.();
            }
          }}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: SCREEN_HEIGHT * 0.04,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xxl,
    textAlign: 'center',
    marginTop: SCREEN_HEIGHT * 0.05,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginBottom: SCREEN_HEIGHT * 0.025,
  },
  image: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
    marginBottom: SCREEN_HEIGHT * 0.22,
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    height: SCREEN_HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default SuccessLocationScreen;
