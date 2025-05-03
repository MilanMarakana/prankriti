import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import CommonBtn from '../../components/UIComponent/commonBtn';
import CommonInput from '../../components/UIComponent/CommonInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {validatePassword} from '../../utils/validation';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const NewPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setPasswordError(validation.error);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setError('');
    navigation.navigate('ResetPwdSuccess');
  };

  const isButtonDisabled =
    !password ||
    !confirmPassword ||
    password !== confirmPassword ||
    !!passwordError;

  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color={COLORS.LIGHT_WHITE} />
        </Pressable>
        <Text style={styles.title}>New Password</Text>
        <Text style={styles.subtitle}>
          Create a new password that is safe and easy to remember
        </Text>
        <CommonInput
          label="New Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            const validation = validatePassword(text);
            setPasswordError(validation.isValid ? '' : validation.error);
          }}
          secureTextEntry={!showPassword}
          leftIcon={<Octicons name="key" size={22} color={COLORS.LIGHT_GRAY} />}
          rightIcon={
            <AntDesign
              name={showPassword ? 'eye' : 'eyeo'}
              size={20}
              color={COLORS.LIGHT_GRAY}
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          error={passwordError}
          errorStyle={styles.error}
        />
        <CommonInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            if (password && text && password !== text) {
              setError('Passwords do not match');
            } else {
              setError('');
            }
          }}
          secureTextEntry={!showConfirmPassword}
          leftIcon={<Octicons name="key" size={22} color={COLORS.LIGHT_GRAY} />}
          rightIcon={
            <AntDesign
              name={showConfirmPassword ? 'eye' : 'eyeo'}
              size={20}
              color={COLORS.LIGHT_GRAY}
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          error={error}
          errorStyle={styles.error}
        />
        <View style={styles.bottomContainer}>
          <CommonBtn
            title="Continue"
            onPress={handleContinue}
            style={styles.continueBtn}
            textStyle={styles.continueBtnText}
            isDisabled={isButtonDisabled}
          />
        </View>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.06,
  },
  backButton: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.055,
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.BOLD,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  inputContainer: {
    borderColor: COLORS.LIGHT_GRAY_3,
    backgroundColor: COLORS.GRAY,
    marginBottom: SCREEN_HEIGHT * 0.015,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
  },
  input: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    paddingLeft: SCREEN_WIDTH * 0.04,
  },
  bottomContainer: {
    marginTop: 'auto',
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  continueBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    height: SCREEN_HEIGHT * 0.065,
  },
  continueBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
  error: {
    color: COLORS.ERROR,
    fontSize: FONT_SIZE.xs,
    fontFamily: FONT_FAMILY.REGULAR,
    marginTop: 0,
  },
});

export default NewPasswordScreen;
