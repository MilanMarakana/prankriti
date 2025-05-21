import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {
  FONT_SIZE,
  SPACING,
  BORDER_RADIUS,
  scale,
} from '../../../constants/responsive';
import {useCreditStore} from '../../../store/creditStore';
import CommonBtn from '../../../components/UIComponent/commonBtn';
import MoneyIcon from '../../../assets/svg/money.svg';

const CreditAccount = () => {
  const {availableCredits, currentPlan, setAutoPay} = useCreditStore();
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Credit Account</Text>
      <View style={styles.creditRow}>
        <Text style={styles.label}>Available credits</Text>
        <Text style={styles.credits}>{availableCredits} Pran Credits</Text>
      </View>
      <View style={styles.planCard}>
        <View style={styles.planLeft}>
          <Text style={styles.planLabel}>Current Plan</Text>
          <Text style={styles.planPrice}>
            ₹{currentPlan.price.toLocaleString()}/month*
          </Text>
          <Text style={styles.planSub}>
            *You'll get {currentPlan.credits} Pran credit.
          </Text>
        </View>
        <View style={styles.planRight}>
          <Switch
            value={currentPlan.isAutoPay}
            onValueChange={setAutoPay}
            trackColor={{false: COLORS.LIGHT_WHITE, true: COLORS.PRIMARY}}
            thumbColor={currentPlan.isAutoPay ? COLORS.WHITE : COLORS.PRIMARY}
            ios_backgroundColor={COLORS.LIGHT_WHITE}
          />
          <Text style={styles.autoPayLabel}>Auto Pay</Text>
        </View>
      </View>
      <View style={styles.btnRow}>
        <CommonBtn
          title="Manage Plan"
          isIcon
          icon={<MoneyIcon width={20} height={20} />}
          style={styles.manageBtn}
          textStyle={styles.manageBtnText}
          onPress={() => {}}
        />
        <CommonBtn
          title="Referral"
          style={styles.referralBtn}
          textStyle={styles.referralBtnText}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xl,
    marginBottom: scale(8),
  },
  creditRow: {
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md_ex,
  },
  label: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
  credits: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xxl,
  },
  planCard: {
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md_ex,
    marginBottom: SPACING.md,
  },
  planLeft: {
    flex: 1,
  },
  planLabel: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.sm,
    marginBottom: scale(4),
  },
  planPrice: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.lg,
    marginBottom: scale(4),
  },
  planSub: {
    color: COLORS.LIGHT_GRAY_4,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.xs,
  },
  planRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoPayLabel: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.xs,
    textDecorationLine: 'underline',
    marginTop: scale(2),
  },
  btnRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  manageBtn: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.xxl,
    height: scale(45),
  },
  manageBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
  referralBtn: {
    flex: 1,
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.xxl,
    height: scale(45),
  },
  referralBtnText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default CreditAccount;
