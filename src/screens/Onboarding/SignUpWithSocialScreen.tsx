import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE} from '../../constants/responsive';
import CommonBtn from '../../components/UIComponent/commonBtn';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import {SCREEN_HEIGHT} from '../../constants/responsive';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SignUpWithSocialScreen: React.FC<Props> = ({navigation}) => {
  const btnData = [
    {
      title: 'Continue with Google',
      icon: require('../../assets/images/google.png'),
    },
    {
      title: 'Continue with Facebook',
      icon: require('../../assets/images/facebook.png'),
    },
    {
      title: 'Continue with Apple',
      icon: require('../../assets/images/apple.png'),
    },
    {
      title: 'Create account manually',
      icon: require('../../assets/images/mobile.png'),
    },
  ];

  const handleSocialLogin = () => {
    navigation.navigate('Verified');
  };

  return (
    <MostCommonLayout>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            Help us help you by getting to know you.
          </Text>
          <Text style={styles.subHeading}>
            Let's setup and intelligent care plan for your plants
          </Text>
        </View>
        <View style={styles.btnContainer}>
          {btnData.map((item, index) => (
            <CommonBtn
              onPress={handleSocialLogin}
              isIcon={true}
              key={index}
              title={item.title}
              icon={item.icon}
              style={{
                backgroundColor: index === 0 ? COLORS.WHITE : COLORS.GRAY,
              }}
              textStyle={{
                color: index === 0 ? COLORS.DARK : COLORS.WHITE,
              }}
            />
          ))}
        </View>
        <Pressable
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </Pressable>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    marginTop: SCREEN_HEIGHT * 0.05,
    height: '40%',
  },
  heading: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    lineHeight: SCREEN_HEIGHT * 0.03,
  },
  subHeading: {
    color: COLORS.SUB_TEXT,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    paddingTop: SCREEN_HEIGHT * 0.01,
  },
  btnContainer: {
    width: '100%',
    marginTop: SCREEN_HEIGHT * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SCREEN_HEIGHT * 0.01,
  },
  loginContainer: {
    marginTop: SCREEN_HEIGHT * 0.01,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.MEDIUM,
    textAlign: 'center',
  },
  loginLink: {
    textDecorationLine: 'underline',
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});

export default SignUpWithSocialScreen;
