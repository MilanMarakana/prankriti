import React from 'react';
import {View, Image, StyleSheet, StatusBar, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

const IntroLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  contentContainerStyle,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/background-intro.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    paddingTop: SCREEN_HEIGHT * 0.1,
    marginLeft: SCREEN_WIDTH * 0.07,
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IntroLayout;
