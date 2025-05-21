import React from 'react';
import {StyleSheet, View} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import CreditTopBar from './CreditComponents/CreditTopBar';
import CreditAccount from './CreditComponents/CreditAccount';
import CreditHistoryTabs from './CreditComponents/CreditHistoryTabs';
import CreditHistoryList from './CreditComponents/CreditHistoryList';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/responsive';

const CreditScreen = () => {
  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <CreditTopBar />
        <CreditAccount />
        <CreditHistoryTabs />
        <CreditHistoryList />
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH * 0.1,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
});

export default CreditScreen;
