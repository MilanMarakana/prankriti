import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import TopBar from './HomeComponents/TopBar';
import Weather from './HomeComponents/Weather';
import WeatherStats from './HomeComponents/WeatherStats';
import TodayTasks from './HomeComponents/TodayTasks';
import UpcomingTasks from './HomeComponents/UpcomingTasks';
import UserBookingCard from './HomeComponents/UserBookingCard';
import SpecialOffers from './HomeComponents/SpecialOffers';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/responsive';

export default function HomeScreen() {
  return (
    <MostCommonLayout showLogo={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TopBar />
        <Weather />
        <WeatherStats />
        <TodayTasks />
        <UpcomingTasks />
        <UserBookingCard
          data={{
            id: '1',
            user: {
              id: '1',
              name: 'Alex Martin',
              occupation: 'Occupation name',
              image: require('../../assets/images/user-1.png'),
            },
            date: new Date().toISOString(),
            time: new Date().toISOString(),
          }}
        />
        <SpecialOffers />
      </ScrollView>
    </MostCommonLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN_WIDTH * 0.05,
  },
  content: {
    paddingTop: SCREEN_WIDTH * 0.05,
    paddingBottom: SCREEN_HEIGHT * 0.11,
  },
});
