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
import SubscribeScreen from '../screens/Payment/SubscribeScreen';
import PaymentMethodScreen from '../screens/Payment/PaymentMethodScreen';
import AddCardScreen from '../screens/Payment/AddCardScreen';
import SuccessSubscribeScreen from '../screens/Payment/SuccessSubscribeScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import SwipeTabNavigator from './SwipeTabNavigator';
import PlantDetails from '../screens/Home/PlantDetails';
import {RootStackParamList} from '../types/navigation';

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
        <Stack.Screen name="Subscribe" component={SubscribeScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="AddCard" component={AddCardScreen} />
        <Stack.Screen
          name="SuccessSubscribe"
          component={SuccessSubscribeScreen}
        />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen
          name="MainTabs"
          component={SwipeTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="PlantDetails" component={PlantDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
