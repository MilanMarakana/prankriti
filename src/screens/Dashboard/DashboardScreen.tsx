import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAuthStore} from '../../store/authStore';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {FONT_SIZE} from '../../constants/responsive';
import CommonLayout from '../../components/CommonLayout/CommonLayout';

const DashboardScreen = () => {
  const {user, isGuest} = useAuthStore();

  return (
    <CommonLayout>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome {user ? user.name : 'Guest'}!
        </Text>
        {isGuest && (
          <View style={styles.guestWarning}>
            <Text style={styles.guestText}>
              You are viewing the dashboard in guest mode. Some features may be
              limited.
            </Text>
          </View>
        )}
        {/* Add your dashboard content here */}
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: FONT_SIZE.xl,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    color: COLORS.WHITE,
    marginBottom: 20,
  },
  guestWarning: {
    backgroundColor: COLORS.WARNING,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  guestText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});

export default DashboardScreen;
