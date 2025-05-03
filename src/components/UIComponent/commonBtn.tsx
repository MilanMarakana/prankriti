import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE, BUTTON_SIZE} from '../../constants/responsive';
import {SCREEN_WIDTH} from '../../constants/responsive';

interface CommonBtnProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  isIcon?: boolean;
  icon?: any;
  isDisabled?: boolean;
}

const CommonBtn: React.FC<CommonBtnProps> = ({
  title,
  onPress,
  style,
  textStyle,
  isIcon = false,
  icon,
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={isDisabled}>
      {isIcon && <Image source={icon} style={styles.buttonImage} />}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    width: '100%',
    height: BUTTON_SIZE.lgBtn.height,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: SCREEN_WIDTH * 0.002,
  },
  buttonText: {
    color: COLORS.DARK,
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    width: '65%',
    textAlign: 'center',
  },
  buttonImage: {
    width: SCREEN_WIDTH * 0.08,
    height: SCREEN_WIDTH * 0.08,
  },
});

export default CommonBtn;
