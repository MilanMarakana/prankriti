import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonBtn from '../../components/UIComponent/commonBtn';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: any;
}

const CODE_LENGTH = 4;
const RESEND_TIME = 60;

const VerificationCodeScreen: React.FC<Props> = ({navigation, route}) => {
  // const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [timer, setTimer] = useState(RESEND_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Keyboard-based code entry logic
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputRef = useRef<TextInput>(null);

  // Focus should be on the first empty box, or the last if all are filled
  const focusIndex = code.findIndex(c => c === '');
  const activeIndex = focusIndex === -1 ? CODE_LENGTH - 1 : focusIndex;

  const handleCodeChange = (text: string) => {
    let arr = text.split('').slice(0, CODE_LENGTH);
    while (arr.length < CODE_LENGTH) {
      arr.push('');
    }
    setCode(arr);
    if (arr.every(d => d !== '')) {
      inputRef.current?.blur();
    }
  };

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Masked detail for display
  const method = route?.params?.method || 'email';
  const detail = route?.params?.detail || '';

  React.useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [timer]);

  const handleResend = () => {
    if (timer === 0) {
      setTimer(RESEND_TIME);
      // Add resend logic here
    }
  };

  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color={COLORS.LIGHT_WHITE} />
        </Pressable>
        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.subtitle}>
          {method === 'email'
            ? 'We sent you a verification code to your email'
            : 'We sent you a verification code to your phone'}
          {'\n'}
          {detail}
        </Text>
        <View style={styles.codeContainer}>
          {[...Array(CODE_LENGTH)].map((_, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.codeBox,
                (code[idx] !== '' || activeIndex === idx) && {
                  borderColor: COLORS.PRIMARY,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleBoxPress}>
              <Text style={styles.codeText}>{code[idx]}</Text>
            </TouchableOpacity>
          ))}
          <TextInput
            ref={inputRef}
            value={code.join('')}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            style={styles.hiddenInput}
            autoFocus={true}
            caretHidden
            importantForAutofill="no"
            textContentType="oneTimeCode"
            returnKeyType="done"
            blurOnSubmit={true}
          />
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend code in </Text>
          <Text style={styles.resendTimer}>
            00:{timer.toString().padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <CommonBtn
            title="Resend Code"
            onPress={handleResend}
            style={styles.resendBtn}
            textStyle={styles.resendBtnText}
            isDisabled={timer > 0}
          />
          <CommonBtn
            title="Verify Code"
            onPress={() => {
              if (code.every(d => d !== '')) {
                navigation.navigate('NewPassword');
              }
            }}
            style={styles.verifyBtn}
            textStyle={styles.verifyBtnText}
            isDisabled={code.some(d => d === '')}
          />
        </View>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: SCREEN_WIDTH * 0.06,
    paddingTop: SCREEN_HEIGHT * 0.06,
    backgroundColor: COLORS.DARK,
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
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  // email: {
  //   color: COLORS.LIGHT_WHITE,
  //   fontFamily: FONT_FAMILY.SEMI_BOLD,
  // },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SCREEN_HEIGHT * 0.03,
    gap: SCREEN_WIDTH * 0.04,
  },
  codeBox: {
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_WIDTH * 0.17,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.LIGHT_GRAY_3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  codeText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.xlt,
    fontFamily: FONT_FAMILY.BOLD,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  resendText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  resendTimer: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    marginLeft: 4,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
    marginBottom: SCREEN_HEIGHT * 0.04,
    gap: SCREEN_WIDTH * 0.04,
  },
  resendBtn: {
    flex: 1,
    backgroundColor: COLORS.GRAY,
    borderRadius: 30,
    // marginRight: SCREEN_WIDTH * 0.02,
    height: SCREEN_HEIGHT * 0.065,
  },
  resendBtnText: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
    flexShrink: 1,
    textAlign: 'center',
  },
  verifyBtn: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    marginLeft: SCREEN_WIDTH * 0.02,
    height: SCREEN_HEIGHT * 0.065,
  },
  verifyBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default VerificationCodeScreen;
