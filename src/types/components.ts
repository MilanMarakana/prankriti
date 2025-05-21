import {TextInputProps, ViewStyle, TextStyle} from 'react-native';
import React from 'react';

export interface IconElement extends React.ReactElement {
  props: {
    color?: string;
    [key: string]: any;
  };
}

export interface CommonInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  required?: boolean;
  validateInput?: (text: string) => string | undefined;
  onChangeValidation?: (error: string | undefined) => void;
}

export interface CommonBtnProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  isIcon?: boolean;
  icon?: React.ReactNode | number;
  isDisabled?: boolean;
}
