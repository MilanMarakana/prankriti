import React from 'react';
import {View, Image, StyleSheet, StatusBar, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  showLogo?: boolean;
  logoStyle?: any;
}

const MostCommonLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  contentContainerStyle,
  showLogo = true,
  logoStyle,
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
          source={require('../../assets/images/Background-L2.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.overlay}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={[styles.logo, logoStyle]}
              resizeMode="contain"
            />
          </View>
        )}
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
  },
  logoContainer: {
    width: '100%',
    paddingTop: SCREEN_HEIGHT * 0.1,
    alignItems: 'center',
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
  },
});

export default MostCommonLayout;
