import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {validateSignUpForm} from '../../utils/validation';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import CommonBtn from '../../components/UIComponent/commonBtn';
import CommonInput from '../../components/UIComponent/CommonInput';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import KeyboardAwareWrapper from '../../components/CommonLayout/KeyboardAwareWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FormFields, SignUpFormData, SignUpFormErrors} from '../../types/forms';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

// Define form field types to ensure consistency
type FormFields = 'name' | 'mobile' | 'email' | 'password';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  password: string;
  profilePicture?: Asset;
}

interface FormErrors {
  name: string;
  mobile: string;
  email: string;
  password: string;
  terms: string;
}

const SignUpScreen: React.FC<Props> = ({navigation: _navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    mobile: '',
    email: '',
    password: '',
    terms: '',
  });

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setFormData(prev => ({...prev, profilePicture: selectedImage}));
    }
  };

  const validateForm = (shouldShowErrors: boolean = false) => {
    const {isValid, errors: validationErrors} = validateSignUpForm(
      formData.name,
      formData.email,
      formData.mobile,
      formData.password,
    );

    if (shouldShowErrors) {
      setErrors(_prev => ({
        ...validationErrors,
        terms: agreeToTerms ? '' : 'error',
      }));
      setShowErrors(true);
      setIsFormSubmitted(true);
    }

    const isTermsValid = agreeToTerms;
    setIsFormValid(isValid && isTermsValid);
    return isValid && isTermsValid;
  };

  const handleCreateAccount = () => {
    const isValid = validateForm(true);
    if (isValid && agreeToTerms) {
      console.log('Create account with:', formData);
      _navigation.navigate('SuccessSignUp');
    }
  };

  const handleInputChange = (field: FormFields, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (showErrors && errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
    if (isFormSubmitted) {
      setTimeout(() => validateForm(false), 0);
    }
  };

  return (
    <MostCommonLayout>
      <KeyboardAwareWrapper bottomPadding={0.13}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>
              Please fill the input below here
            </Text>
          </View>

          <Pressable
            style={styles.profileContainer}
            onPress={handleSelectImage}>
            <View style={styles.profilePicture}>
              {formData.profilePicture ? (
                <Image
                  source={{uri: formData.profilePicture.uri}}
                  style={styles.profileImage}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={40}
                  color={COLORS.LIGHT_GRAY}
                />
              )}
              <View style={styles.editIconContainer}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={16}
                  color={COLORS.LIGHT_WHITE}
                />
              </View>
            </View>
            <Text style={styles.uploadText}>
              {formData.profilePicture
                ? 'Change Profile Picture'
                : 'Upload your Profile Picture'}
            </Text>
          </Pressable>

          <View style={styles.formContainer}>
            <CommonInput
              label="Name"
              placeholder="Enter full name"
              required
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              error={showErrors ? errors.name : undefined}
              leftIcon={
                <MaterialCommunityIcons
                  name="account-outline"
                  size={22}
                  color={COLORS.LIGHT_GRAY}
                />
              }
            />

            <CommonInput
              label="Mobile Number"
              placeholder="Enter phone number"
              required
              value={formData.mobile}
              onChangeText={text => handleInputChange('mobile', text)}
              error={showErrors ? errors.mobile : undefined}
              keyboardType="phone-pad"
              leftIcon={
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={22}
                  color={COLORS.LIGHT_GRAY}
                />
              }
            />

            <CommonInput
              label="Email"
              placeholder="martinelvis@domain"
              required
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              error={showErrors ? errors.email : undefined}
              keyboardType="email-address"
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
              onChangeText={text => handleInputChange('password', text)}
              error={showErrors ? errors.password : undefined}
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

            <View style={styles.termsContainer}>
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => {
                  setAgreeToTerms(!agreeToTerms);
                  if (showErrors) {
                    setErrors(_prev => ({
                      ..._prev,
                      terms: !agreeToTerms ? '' : 'error',
                    }));
                  }
                  setTimeout(() => validateForm(false), 0);
                }}>
                <MaterialIcons
                  name={agreeToTerms ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color={
                    showErrors && !agreeToTerms ? COLORS.ERROR : COLORS.PRIMARY
                  }
                />
                <Text
                  style={[
                    styles.termsText,
                    showErrors && !agreeToTerms && styles.termsTextError,
                  ]}>
                  By signing up, you agree to our{' '}
                  <Text
                    style={[
                      styles.linkText,
                      showErrors && !agreeToTerms && styles.termsTextError,
                    ]}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={[
                      styles.linkText,
                      showErrors && !agreeToTerms && styles.termsTextError,
                    ]}>
                    Privacy Policy
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <CommonBtn
              title="Create account"
              onPress={handleCreateAccount}
              style={{
                backgroundColor: isFormValid ? COLORS.PRIMARY : COLORS.GRAY,
              }}
              textStyle={{color: COLORS.LIGHT_WHITE, fontSize: FONT_SIZE.md}}
            />
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
    marginTop: SCREEN_HEIGHT * 0.02,
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  profilePicture: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    borderRadius: SCREEN_WIDTH * 0.1,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.01,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.PRIMARY,
    padding: SCREEN_WIDTH * 0.01,
    borderRadius: SCREEN_WIDTH * 0.02,
    margin: SCREEN_WIDTH * 0.01,
  },
  uploadText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  formContainer: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  termsContainer: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
  },
  termsText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    flex: 1,
  },
  termsTextError: {
    color: COLORS.ERROR,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: FONT_SIZE.xs,
    fontFamily: FONT_FAMILY.REGULAR,
    marginTop: 4,
    marginLeft: 32,
  },
  linkText: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  bottomContainer: {
    marginVertical: SCREEN_HEIGHT * 0.05,
  },
});

export default SignUpScreen;
