import {Region} from 'react-native-maps';

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
  Subscribe: undefined;
  PaymentMethod: undefined;
  AddCard: undefined;
  SuccessSubscribe: undefined;
  Dashboard: undefined;
  MainTabs: undefined;
  PlantDetails: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
