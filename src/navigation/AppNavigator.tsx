import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import GetStartedScreen from '../screens/GetStarted/GetStartedScreen';
import IntroScreen from '../screens/Onboarding/IntroScreen';
import SignUpWithSocialScreen from '../screens/Onboarding/SignUpWithSocialScreen';
import VerifiedScreen from '../screens/Onboarding/VerifiedScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import SuccessSignUpScreen from '../screens/Auth/SuccessSignUpScreen';
import ForgetPasswordScreen from '../screens/Auth/ForgetPasswordScreen';
import VerificationCodeScreen from '../screens/Auth/VerificationCodeScreen';
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen';
import ResetPwdSuccessScreen from '../screens/Auth/ResetPwdSuccessScreen';
import GetStartWithLocScreen from '../screens/Location/GetStartWithLocScreen';
import SelectLocationScreen from '../screens/Location/SelectLocationScreen';
import MapLocationScreen from '../screens/Location/MapLocationScreen';
import SuccessLocationScreen from '../screens/Location/SuccessLocationScreen';
import {Region} from 'react-native-maps';

// Define the type for our stack navigator
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  GetStarted: undefined;
  Intro: undefined;
  SignUpWithSocial: undefined;
  Verified: undefined;
  Login: undefined;
  SignUp: undefined;
  SuccessSignUp: undefined;
  ForgetPassword: undefined;
  VerificationCode:
    | {method: 'email' | 'phone' | null; detail: string}
    | undefined;
  NewPassword: undefined;
  ResetPwdSuccess: undefined;
  GetStartWithLoc: undefined;
  SelectLocation:
    | {
        latitude?: number;
        longitude?: number;
        manual?: boolean;
        searchText?: string;
        region?: Region;
      }
    | undefined;
  MapLocation:
    | {
        latitude?: number;
        longitude?: number;
        manual?: boolean;
        searchText?: string;
        region?: Region;
      }
    | undefined;
  SuccessLocation:
    | {
        serviceable: boolean;
      }
    | undefined;
  // Add other screen types here as we create them
  // Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer
      onStateChange={state => {
        console.log('Navigation State:', state);
      }}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          // gestureEnabled: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen
          name="SignUpWithSocial"
          component={SignUpWithSocialScreen}
        />
        <Stack.Screen name="Verified" component={VerifiedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SuccessSignUp" component={SuccessSignUpScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCodeScreen}
        />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen
          name="ResetPwdSuccess"
          component={ResetPwdSuccessScreen}
        />
        <Stack.Screen
          name="GetStartWithLoc"
          component={GetStartWithLocScreen}
        />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="MapLocation" component={MapLocationScreen} />
        <Stack.Screen
          name="SuccessLocation"
          component={SuccessLocationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
