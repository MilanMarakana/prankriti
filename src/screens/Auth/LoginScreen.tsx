import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import CommonBtn from '../../components/UIComponent/commonBtn';
import CommonInput from '../../components/UIComponent/CommonInput';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import KeyboardAwareWrapper from '../../components/CommonLayout/KeyboardAwareWrapper';
import {validateLoginForm} from '../../utils/validation';
import {FONT_SIZE} from '../../constants/responsive';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FormErrors} from '../../types/forms';
import {useAuthStore} from '../../store/authStore';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = () => {
    const {isValid, errors: validationErrors} = validateLoginForm(
      email,
      password,
    );
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // TODO: Replace with actual API call
    // For now, we'll simulate a successful login
    setUser({
      id: '1',
      email: email,
      name: 'Test User',
    });
    navigation.navigate('Dashboard');
  };

  return (
    <MostCommonLayout>
      <KeyboardAwareWrapper>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Please enter your details to sign in
          </Text>

          <View style={styles.form}>
            <CommonInput
              placeholder="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors({...errors, email: ''});
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CommonInput
              placeholder="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors({...errors, password: ''});
              }}
              error={errors.password}
              secureTextEntry
            />

            <Pressable
              onPress={() => navigation.navigate('ForgetPassword')}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            <CommonBtn
              title="Sign In"
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAwareWrapper>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    color: COLORS.WHITE,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    color: COLORS.SUB_TEXT,
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
  loginButton: {
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: COLORS.SUB_TEXT,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  signupLink: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});

export default LoginScreen;
