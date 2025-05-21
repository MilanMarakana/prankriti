import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, StatusBar, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {FONT_FAMILY, FONT_WEIGHTS} from '../../constants/fonts';
import {COLORS} from '../../constants/colors';
import RNSplashScreen from 'react-native-splash-screen';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SplashScreen: React.FC<Props> = ({navigation}) => {
  // Animation values
  const logoAnimation = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hide the native splash screen
    RNSplashScreen.hide();

    console.log('SplashScreen mounted');

    // Start animations after a short delay
    const startAnimations = () => {
      console.log('Starting animations');
      // Logo animation
      Animated.sequence([
        Animated.delay(500), // Wait for 500ms
        Animated.timing(logoAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => console.log('Logo animation completed'));

      // Text animation
      Animated.sequence([
        Animated.delay(1000), // Wait for 1000ms
        Animated.timing(textAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => console.log('Text animation completed'));
    };

    startAnimations();

    // Navigate to next screen after animations
    const timer = setTimeout(() => {
      console.log('Navigation timer completed');
      // navigation.replace('GetStarted');
      navigation.replace('MainTabs');
    }, 2500); // Total animation time + extra delay

    return () => {
      console.log('SplashScreen unmounting');
      clearTimeout(timer);
    };
  }, [navigation, logoAnimation, textAnimation]);

  // Transform and opacity interpolations
  const logoStyle = {
    transform: [
      {
        scale: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
    opacity: logoAnimation,
  };

  //   const textStyle = {
  //     transform: [
  //       {
  //         translateY: textAnimation.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [20, 0],
  //         }),
  //       },
  //     ],
  //     opacity: textAnimation,
  //   };

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
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.logoContainer, logoStyle]}>
            <Image
              source={require('../../assets/images/logo-text.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
          {/* <Animated.Text style={[styles.tagline, textStyle]}>
            Grow Anywhere, Anytime – Your Plants, Our Way!
          </Animated.Text> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004D2E',
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
    backgroundColor: 'rgba(0, 77, 46, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '85%',
    transform: [
      {translateX: -SCREEN_WIDTH * 0.425},
      {translateY: -SCREEN_HEIGHT * 0.1},
    ],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SCREEN_HEIGHT * 0.0001,
  },
  logo: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.22,
  },
  tagline: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: Math.min(SCREEN_WIDTH * 0.045, 14.5),
    fontFamily: FONT_FAMILY.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    marginTop: SCREEN_HEIGHT * 0.0001,
    lineHeight: Math.min(SCREEN_WIDTH * 0.06, 24),
  },
});

export default SplashScreen;
