import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE} from '../../constants/responsive';
import CommonBtn from '../../components/UIComponent/commonBtn';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/responsive';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import LottieView from 'lottie-react-native';
import {disableHardwareBackButton} from '../../utils/navigation';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SuccessSignUpScreen: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const backHandler = disableHardwareBackButton();
    return () => {
      backHandler.remove(); // Clean up the event listener when component unmounts
    };
  }, []);

  return (
    <>
      <MostCommonLayout showLogo={false}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/success-signup.png')}
                style={styles.successIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Congratulations!</Text>
              <Text style={styles.subtitle}>
                You have successfully registered. Click button bellow to
                continue using the apps
              </Text>
            </View>
          </View>
          <CommonBtn
            title="Continue"
            onPress={() => {
              console.log('Continue button pressed');
              navigation.navigate('GetStarted');
            }}
            style={styles.button}
          />
        </View>
      </MostCommonLayout>
      <LottieView
        source={require('../../assets/lottie/confetti.json')}
        autoPlay
        loop
        style={styles.confettiAnimation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SCREEN_HEIGHT * 0.05,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: SCREEN_HEIGHT * 0.1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  successIcon: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    zIndex: 2,
  },
  confettiAnimation: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    textAlign: 'center',
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SCREEN_WIDTH * 0.08,
    zIndex: 1111,
  },
});

export default SuccessSignUpScreen;
