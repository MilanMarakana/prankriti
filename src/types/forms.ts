import {Asset} from 'react-native-image-picker';

export interface FormErrors {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  mobile: string;
  email: string;
  password: string;
  profilePicture?: Asset;
}

export interface SignUpFormErrors {
  name: string;
  mobile: string;
  email: string;
  password: string;
  terms: string;
}

export type FormFields = 'name' | 'mobile' | 'email' | 'password';
