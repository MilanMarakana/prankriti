import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY, FONT_WEIGHTS} from '../../constants/fonts';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import CommonBtn from '../../components/UIComponent/commonBtn';
import {FONT_SIZE} from '../../constants/responsive';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const GetStartedScreen: React.FC<Props> = ({navigation}) => {
  return (
    <CommonLayout>
      <View style={styles.container}>
        <Text style={styles.mainText}>
          Worried about dirty air in your house? Thinking of buying an electric
          air purifier? How about an actual living air purifier?
        </Text>
        <View style={styles.buttonContainer}>
          <CommonBtn
            style={styles.button}
            title="Get Started →"
            onPress={() => navigation.navigate('Onboarding')}
          />
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: SCREEN_HEIGHT * 0.15,
  },
  mainText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.xxxl,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    textAlign: 'center',
    lineHeight: Math.min(SCREEN_WIDTH * 0.09, 36),
    marginTop: 0,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    width: '100%',
    height: SCREEN_HEIGHT * 0.07,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  loginText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.MEDIUM,
    textAlign: 'center',
  },
  loginLink: {
    textDecorationLine: 'underline',
    fontFamily: FONT_FAMILY.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
});

export default GetStartedScreen;
