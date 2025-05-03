import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE} from '../../constants/responsive';
import {SCREEN_WIDTH} from '../../constants/responsive';

interface IconElement extends React.ReactElement {
  props: {
    color?: string;
    [key: string]: any;
  };
}

interface CommonInputProps extends TextInputProps {
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

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  required,
  validateInput,
  onChangeValidation,
  onChangeText,
  value,
  ...textInputProps
}) => {
  const [localError, setLocalError] = useState<string | undefined>(error);
  const hasContent = Boolean(value && value.length > 0);

  const renderIcon = (icon: React.ReactNode, isContent: boolean) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as IconElement, {
        color: isContent ? COLORS.LIGHT_WHITE : COLORS.LIGHT_GRAY,
      });
    }
    return icon;
  };

  const handleChangeText = (text: string) => {
    // Clear errors immediately when user starts typing
    setLocalError(undefined);
    if (onChangeValidation) {
      onChangeValidation(undefined);
    }

    if (onChangeText) {
      onChangeText(text);
    }

    // Only validate after user has finished typing
    if (validateInput) {
      const validationError = validateInput(text);
      if (validationError) {
        setLocalError(validationError);
        if (onChangeValidation) {
          onChangeValidation(validationError);
        }
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          hasContent && styles.inputContainerFilled,
          error || localError ? styles.inputContainerError : null,
          inputContainerStyle,
        ]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {renderIcon(leftIcon, hasContent)}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
            inputStyle,
          ]}
          placeholderTextColor={COLORS.LIGHT_GRAY}
          onChangeText={handleChangeText}
          value={value}
          {...textInputProps}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}>
            {renderIcon(rightIcon, hasContent)}
          </TouchableOpacity>
        )}
      </View>
      {(error || localError) && (
        <Text style={[styles.error, errorStyle]}>{error || localError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  label: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    marginBottom: SCREEN_WIDTH * 0.02,
  },
  labelFilled: {
    color: COLORS.GRAY,
  },
  required: {
    color: COLORS.ERROR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SCREEN_WIDTH * 0.03,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    backgroundColor: 'transparent',
    minHeight: SCREEN_WIDTH * 0.14,
  },
  inputContainerFilled: {
    backgroundColor: COLORS.GRAY,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY_3,
  },
  inputContainerError: {
    borderColor: COLORS.ERROR,
  },
  input: {
    flex: 1,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
  inputWithLeftIcon: {
    paddingLeft: SCREEN_WIDTH * 0.02,
  },
  inputWithRightIcon: {
    paddingRight: SCREEN_WIDTH * 0.02,
  },
  leftIconContainer: {
    paddingLeft: SCREEN_WIDTH * 0.04,
  },
  rightIconContainer: {
    paddingRight: SCREEN_WIDTH * 0.04,
  },
  error: {
    color: COLORS.ERROR,
    fontSize: FONT_SIZE.xs,
    fontFamily: FONT_FAMILY.REGULAR,
    marginTop: SCREEN_WIDTH * 0.02,
  },
});

export default CommonInput;
