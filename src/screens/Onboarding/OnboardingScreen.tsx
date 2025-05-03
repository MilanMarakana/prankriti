import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE} from '../../constants/responsive';
import OnboardingLayout from '../../components/CommonLayout/OnboardingLayout';
import CommonBtn from '../../components/UIComponent/commonBtn';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const onboardingData = [
  {
    image: require('../../assets/images/onboarding-1.png'),
    text: 'Worried about dirty air in your house? Thinking of buying an electric air purifier? How about an actual living air purifier?',
  },
  {
    image: require('../../assets/images/onboarding-2.png'),
    text: "Love having plants at home? But afraid you don't know how to maintain them?",
  },
  {
    image: require('../../assets/images/onboarding-3.png'),
    text: 'Maintaining ten different types of plants at your home. Tedious? Not anymore.',
  },
];

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startSlideAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(slideAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startSlideAnimation();

    return () => {
      slideAnimation.setValue(0);
    };
  }, [slideAnimation]);

  const slideInterpolate = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Intro'); // Navigate to IntroScreen
    }
  };

  return (
    <OnboardingLayout>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{translateY: slideInterpolate}],
            },
          ]}>
          <Image
            source={onboardingData[currentIndex].image}
            style={styles.centerImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.text}>{onboardingData[currentIndex].text}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.paginationContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          <CommonBtn
            title={
              currentIndex === onboardingData.length - 1
                ? "Let's us help you!"
                : 'Next'
            }
            onPress={handleNext}
          />
        </View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  centerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.xlt,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    textAlign: 'center',
    lineHeight: Math.min(SCREEN_WIDTH * 0.08, 32),
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_HEIGHT * 0.02,
    height: SCREEN_HEIGHT * 0.2,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.15,
    paddingBottom: SCREEN_HEIGHT * 0.05,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 4,
    opacity: 0.4,
  },
  paginationDotActive: {
    opacity: 1,
    width: 20,
  },
});

export default OnboardingScreen;
