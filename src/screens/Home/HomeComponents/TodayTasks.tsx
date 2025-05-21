import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useHomeStore} from '../../../store/homeStore';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {FONT_SIZE, SCREEN_WIDTH} from '../../../constants/responsive';
import Checkmark from '../../../assets/svg/checkmark.svg';
import {FlashList} from '@shopify/flash-list';

export default function TodayTasks() {
  const todayTasks = useHomeStore(s => s.todayTasks);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's task</Text>
      {todayTasks.length === 0 ? (
        <View style={styles.completedBox}>
          <View style={styles.rowCenter}>
            <Checkmark width={18} height={18} />
          </View>
          <View style={styles.completedTextContainer}>
            <Text style={styles.completedText}>All tasks completed</Text>
            <Text style={styles.subText}>New tasks will show up here</Text>
          </View>
        </View>
      ) : (
        <FlashList
          data={todayTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.taskRow}>
              <Checkmark width={18} height={18} />
              <Text style={styles.taskText}>{item.title}</Text>
            </View>
          )}
          estimatedItemSize={48}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_WIDTH * 0.04,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xl,
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  completedBox: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  completedTextContainer: {
    // marginLeft: 10,
  },
  rowCenter: {
    backgroundColor: COLORS.LIGHT_GRAY_3,
    width: 38,
    height: 38,
    borderRadius: 9999,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.md,
  },
  subText: {
    color: COLORS.LIGHT_GRAY_4,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  taskText: {
    color: COLORS.LIGHT_GRAY_4,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.md,
  },
});
