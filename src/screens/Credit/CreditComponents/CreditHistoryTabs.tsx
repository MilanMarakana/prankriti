import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {FONT_SIZE, SPACING, scale} from '../../../constants/responsive';
import {useCreditStore} from '../../../store/creditStore';

const CreditHistoryTabs = () => {
  const {historyTab, setHistoryTab} = useCreditStore();
  return (
    <View style={styles.tabsRow}>
      <Text style={styles.historyTitle}>History</Text>
      <View style={styles.tabsWrap}>
        <TouchableOpacity
          onPress={() => setHistoryTab('credit')}
          style={styles.tabBtn}>
          <Text
            style={[
              styles.tabText,
              historyTab === 'credit' && styles.tabTextActive,
            ]}>
            Credit History
          </Text>
          <View
            style={[
              styles.underline,
              {
                backgroundColor:
                  historyTab === 'credit' ? COLORS.LIGHT_WHITE : COLORS.GRAY,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setHistoryTab('plan')}
          style={styles.tabBtn}>
          <Text
            style={[
              styles.tabText,
              historyTab === 'plan' && styles.tabTextActive,
            ]}>
            Plan History
          </Text>
          <View
            style={[
              styles.underline,
              {
                backgroundColor:
                  historyTab === 'plan' ? COLORS.LIGHT_WHITE : COLORS.GRAY,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historyTitle: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xl,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  tabsWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: scale(16),
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: scale(2),
  },
  tabText: {
    color: COLORS.GRAY,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.xs,
  },
  tabTextActive: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  underline: {
    height: scale(2),
    borderRadius: scale(2),
    marginTop: scale(2),
    width: '100%',
  },
});

export default CreditHistoryTabs;
