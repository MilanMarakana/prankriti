import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import CommonBtn from '../../components/UIComponent/commonBtn';
import CommonInput from '../../components/UIComponent/CommonInput';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import KeyboardAwareWrapper from '../../components/CommonLayout/KeyboardAwareWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {validateLoginForm} from '../../utils/validation';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

interface FormErrors {
  email: string;
  password: string;
}

interface FormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = (newEmail?: string, newPassword?: string) => {
    const email = newEmail ?? formData.email;
    const password = newPassword ?? formData.password;

    const {isValid} = validateLoginForm(email, password);
    setIsFormValid(isValid);
  };

  const handleLogin = () => {
    const {isValid, errors: validationErrors} = validateLoginForm(
      formData.email,
      formData.password,
    );

    setErrors(validationErrors);

    if (isValid) {
      console.log('Login with:', formData);
      // Proceed with login
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <MostCommonLayout>
      <KeyboardAwareWrapper>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Login to your account</Text>
            <Text style={styles.subtitle}>
              Please fill the input below here
            </Text>
          </View>

          <View style={styles.formContainer}>
            <CommonInput
              label="Email"
              placeholder="Enter Email Address"
              required
              value={formData.email}
              onChangeText={text => {
                setFormData(prev => ({...prev, email: text}));
                // Clear email error when typing
                if (errors.email) {
                  setErrors(prev => ({...prev, email: ''}));
                }
                checkFormValidity(text, formData.password);
              }}
              error={errors.email}
              leftIcon={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={22}
                  color={COLORS.LIGHT_GRAY}
                />
              }
            />
            <CommonInput
              label="Password"
              placeholder="Enter Your Password"
              required
              value={formData.password}
              onChangeText={text => {
                setFormData(prev => ({...prev, password: text}));
                // Clear password error when typing
                if (errors.password) {
                  setErrors(prev => ({...prev, password: ''}));
                }
                checkFormValidity(formData.email, text);
              }}
              error={errors.password}
              secureTextEntry={!showPassword}
              leftIcon={
                <Fontisto name="key" size={22} color={COLORS.LIGHT_GRAY} />
              }
              rightIcon={
                <AntDesign
                  name={showPassword ? 'eyeo' : 'eye'}
                  size={22}
                  color={COLORS.LIGHT_GRAY}
                />
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            <View style={styles.optionsContainer}>
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => setRememberMe(!rememberMe)}>
                <MaterialIcons
                  name={rememberMe ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color={COLORS.PRIMARY}
                />
                <Text style={styles.rememberText}>Remember Me</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <CommonBtn
              title="Log in"
              onPress={handleLogin}
              style={{
                backgroundColor: isFormValid ? COLORS.PRIMARY : COLORS.GRAY,
              }}
              textStyle={{color: COLORS.LIGHT_WHITE, fontSize: FONT_SIZE.md}}
            />

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>Or login with</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.socialContainer}>
              <CommonBtn
                title="Google"
                isIcon={true}
                icon={require('../../assets/images/google.png')}
                style={styles.socialButton}
                textStyle={styles.socialButtonText}
                onPress={() => console.log('Google login')}
              />
              <CommonBtn
                title="Facebook"
                isIcon={true}
                icon={require('../../assets/images/facebook.png')}
                style={styles.socialButton}
                textStyle={styles.socialButtonText}
                onPress={() => console.log('Facebook login')}
              />
            </View>

            <Pressable
              style={styles.signupContainer}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupText}>
                Don't have an Account?{' '}
                <Text style={styles.signupLink}>Signup</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareWrapper>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: SCREEN_WIDTH * 0.01,
  },
  headerContainer: {
    marginTop: SCREEN_HEIGHT * 0.1,
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.1,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  formContainer: {
    marginTop: SCREEN_HEIGHT * 0.08,
  },
  inputIcon: {
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_WIDTH * 0.05,
    tintColor: COLORS.SUB_TEXT,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
  },
  rememberText: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  forgotText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: SCREEN_HEIGHT * 0.05,
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.04,
  },
  orText: {
    color: COLORS.LIGHT_GRAY_3,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
    marginVertical: SCREEN_HEIGHT * 0.01,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.LIGHT_GRAY_3,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.04,
  },
  socialButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    gap: SCREEN_WIDTH * 0.02,
  },
  socialButtonText: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.MEDIUM,
    width: 'auto',
  },
  signupContainer: {
    marginTop: SCREEN_HEIGHT * 0.03,
    alignItems: 'center',
  },
  signupText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  signupLink: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});

export default LoginScreen;
