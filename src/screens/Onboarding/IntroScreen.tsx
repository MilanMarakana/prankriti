import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IntroLayout from '../../components/CommonLayout/IntroLayout';
import CommonBtn from '../../components/UIComponent/commonBtn';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE} from '../../constants/responsive';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/responsive';
import {RootStackParamList} from '../../navigation/AppNavigator';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const IntroScreen: React.FC<Props> = ({navigation}) => {
  return (
    <IntroLayout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/intro-img.png')}
          style={styles.centerImage}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Let’s break down what we do?</Text>
          <Text style={styles.text}>
            Personalized plant care reminders, Growth tracking tips, Community
            support & expert advice.
          </Text>
          <Text style={styles.heading}>
            Take your love for plants to the next level with our expert team and
            mobile app service.
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <CommonBtn
            title="Let's us go ahead"
            onPress={() => {
              navigation.navigate('SignUpWithSocial');
            }}
          />
        </View>
      </View>
    </IntroLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    backgroundColor: 'transparent',
  },
  textContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.7,
    backgroundColor: 'transparent',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  heading: {
    color: COLORS.SUB_TEXT,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.REGULAR,
    paddingBottom: SCREEN_HEIGHT * 0.02,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.xlt,
    fontFamily: FONT_FAMILY.BOLD,
    lineHeight: SCREEN_HEIGHT * 0.04,
    paddingBottom: SCREEN_HEIGHT * 0.02,
  },
  btnContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: 'transparent',
    marginTop: SCREEN_HEIGHT * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IntroScreen;
