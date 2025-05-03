import React from 'react';
import {View, Image, StyleSheet, StatusBar, ViewStyle} from 'react-native';
import {COLORS} from '../../constants/colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

interface CommonLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({
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
          source={require('../../assets/images/splash-screen.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.overlay}>
        <View style={[styles.contentContainer, contentContainerStyle]}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo-text.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
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
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.12,
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  logo: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.22,
  },
});

export default CommonLayout;
