import React, {useState, useEffect, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Keyboard,
  ViewStyle,
} from 'react-native';
import {SCREEN_HEIGHT} from '../../constants/responsive';

interface Props {
  children: ReactNode;
  containerStyle?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  keyboardVerticalOffset?: number;
  bottomPadding?: number;
}

const KeyboardAwareWrapper: React.FC<Props> = ({
  children,
  containerStyle,
  scrollViewStyle,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0,
  bottomPadding = 0.12,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, containerStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          scrollViewStyle,
          isKeyboardVisible && {paddingBottom: SCREEN_HEIGHT * bottomPadding},
        ]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default KeyboardAwareWrapper;
