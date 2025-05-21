import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import CommonBtn from '../../components/UIComponent/commonBtn';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonInput from '../../components/UIComponent/CommonInput';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const ForgetPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState<
    'phone' | 'email' | null
  >(null);
  const [detail, setDetail] = useState<string>('');
  const [step, setStep] = useState<number>(0);

  const setMethodAndData = (method: 'phone' | 'email', data: string) => {
    setSelectedMethod(method);
    setDetail(data);
  };

  const handleContinue = () => {
    if (step === 0) {
      if (selectedMethod) {
        // Handle navigation based on selected method
        setStep(step + 1);
      }
    } else {
      // Navigate to VerificationCode screen with method and detail
      navigation.navigate('VerificationCode', {
        method: selectedMethod,
        detail: detail,
      });
    }
  };

  const navigateToBack = () => {
    if (step === 1) {
      setStep(0);
    } else {
      navigation.goBack();
    }
  };

  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={navigateToBack}>
            <AntDesign name="arrowleft" size={24} color={COLORS.LIGHT_WHITE} />
          </Pressable>
          <Text style={styles.title}>
            {step === 0 ? 'Forgot Password' : 'Reset Password'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 0
              ? 'Select verification method and we will send verification code'
              : selectedMethod === 'email'
              ? 'Please enter your email address. You will receive an OTP code to create a new account via email.'
              : `Reset Password We have just sent a verification code to ${detail}. Please check your phone to get verification code.`}
          </Text>
        </View>

        <View style={styles.contentContainer}>
          {step === 0 && (
            <View style={styles.methodsContainer}>
              <Pressable
                style={[
                  styles.methodItem,
                  selectedMethod === 'phone' && styles.methodItemSelected,
                ]}
                onPress={() => setMethodAndData('phone', '1523527632')}>
                <View style={styles.methodIconContainer}>
                  <Image
                    source={require('../../assets/icons/phone-notif.png')}
                    style={styles.methodIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.methodTextContainer}>
                  <Text style={styles.methodTitle}>Via Phone Number</Text>
                  <Text style={styles.methodValue}>**** ** 7632</Text>
                </View>
              </Pressable>

              <Pressable
                style={[
                  styles.methodItem,
                  selectedMethod === 'email' && styles.methodItemSelected,
                ]}
                onPress={() => setMethodAndData('email', 'prankriti@mail.com')}>
                <View style={styles.methodIconContainer}>
                  <Image
                    source={require('../../assets/icons/email-notif.png')}
                    style={styles.methodIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.methodTextContainer}>
                  <Text style={styles.methodTitle}>Via Email</Text>
                  <Text style={styles.methodValue}>****@domain.com</Text>
                </View>
              </Pressable>
            </View>
          )}

          {step === 1 && selectedMethod === 'email' && (
            <CommonInput
              inputContainerStyle={{
                borderColor: COLORS.LIGHT_GRAY_3,
                marginTop: SCREEN_HEIGHT * 0.003,
              }}
              containerStyle={{
                marginTop: SCREEN_HEIGHT * 0.07,
              }}
              inputStyle={{
                paddingLeft: SCREEN_WIDTH * 0.04,
              }}
              label="Email"
              value={detail}
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color={COLORS.LIGHT_GRAY}
                />
              }
            />
          )}

          {step === 1 && selectedMethod === 'phone' && (
            <CommonInput
              inputContainerStyle={{
                borderColor: COLORS.LIGHT_GRAY_3,
                marginTop: SCREEN_HEIGHT * 0.003,
              }}
              containerStyle={{
                marginTop: SCREEN_HEIGHT * 0.07,
              }}
              inputStyle={{
                paddingLeft: SCREEN_WIDTH * 0.04,
              }}
              label="Mobile Number"
              value={detail}
              leftIcon={
                <Ionicons
                  name="call-outline"
                  size={22}
                  color={COLORS.LIGHT_GRAY}
                />
              }
            />
          )}
        </View>

        <View style={styles.bottomContainer}>
          <CommonBtn
            title="Continue"
            onPress={handleContinue}
            isDisabled={!selectedMethod}
            style={{
              backgroundColor: selectedMethod ? COLORS.PRIMARY : COLORS.GRAY,
            }}
            textStyle={{
              color: selectedMethod ? COLORS.DARK : COLORS.LIGHT_WHITE,
              fontSize: FONT_SIZE.md,
              fontFamily: FONT_FAMILY.SEMI_BOLD,
            }}
          />
        </View>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: SCREEN_WIDTH * 0.01,
    paddingVertical: SCREEN_HEIGHT * 0.08,
  },
  headerContainer: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  contentContainer: {
    flex: 1,
  },
  backButton: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    marginBottom: SCREEN_HEIGHT * 0.02,
    backgroundColor: COLORS.GRAY,
    borderRadius: '50%',
    padding: SCREEN_WIDTH * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  methodsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.DARK,
    borderRadius: SCREEN_WIDTH * 0.04,
    padding: SCREEN_WIDTH * 0.04,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    gap: SCREEN_WIDTH * 0.02,
  },
  methodItemSelected: {
    borderColor: COLORS.PRIMARY,
  },
  methodIconContainer: {
    width: SCREEN_WIDTH * 0.13,
    height: SCREEN_WIDTH * 0.13,
    backgroundColor: COLORS.GRAY,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIcon: {
    width: SCREEN_WIDTH * 0.06,
    height: SCREEN_WIDTH * 0.06,
    tintColor: COLORS.LIGHT_WHITE,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodTitle: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.BOLD,
    marginBottom: 4,
  },
  methodValue: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  bottomContainer: {
    width: '100%',
  },
});

export default ForgetPasswordScreen;
