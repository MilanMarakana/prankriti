import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useHomeStore} from '../../../store/homeStore';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {FONT_SIZE, SCREEN_WIDTH} from '../../../constants/responsive';
import WaterPlant from '../../../assets/svg/watering-can-plant.svg';

export default function UpcomingTasks() {
  const upcomingTasks = useHomeStore(s => s.upcomingTasks);
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Upcoming tasks</Text>
        <Text style={styles.count}>{upcomingTasks.length} Tasks</Text>
      </View>
      <FlashList
        data={upcomingTasks}
        renderItem={({item}) => (
          <View style={styles.taskBox}>
            <View style={styles.rowCenter}>
              <WaterPlant width={24} height={24} />
            </View>
            <View style={styles.taskDetailsBox}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDesc}>{item.description}</Text>
            </View>
          </View>
        )}
        estimatedItemSize={80}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_WIDTH * 0.04,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xl,
  },
  count: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.sm,
  },
  rowCenter: {
    backgroundColor: COLORS.LIGHT_GRAY_3,
    width: 56,
    height: 56,
    borderRadius: 9999,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskDetailsBox: {
    gap: 4,
  },
  taskBox: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  taskTitle: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.md,
  },
  taskDesc: {
    color: COLORS.LIGHT_GRAY_4,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
});
