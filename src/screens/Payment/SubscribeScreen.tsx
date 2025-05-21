import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import {usePaymentCartStore} from '../../store/paymentCartStore';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SubscribeScreen: React.FC<Props> = ({navigation}) => {
  const {
    plans,
    selectedPlanId,
    quantity,
    setSelectedPlan,
    increment,
    decrement,
  } = usePaymentCartStore();

  return (
    <MostCommonLayout showLogo={true} logoStyle={styles.logo}>
      <View style={styles.container}>
        <Text style={styles.heading}>Subscribe to premium</Text>
        <Text style={styles.subheading}>
          Choose the perfect plan for a hassle-free and evergreen space!
        </Text>
        <View style={styles.plansContainer}>
          {plans.map(plan => {
            const isSelected = plan.id === selectedPlanId;
            const planQty = quantity[plan.id] || 1;
            return (
              <Pressable
                key={plan.id}
                style={[styles.planBox, isSelected && styles.planBoxSelected]}
                onPress={() => setSelectedPlan(plan.id)}>
                <View style={styles.planHeaderRow}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  {plan.badge && (
                    <View
                      style={[
                        styles.badge,
                        {backgroundColor: plan.badgeColor || COLORS.PRIMARY},
                      ]}>
                      <Text style={styles.badgeText}>{plan.badge}</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelected,
                    ]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.planDescription}>{plan.description}</Text>
                <View style={styles.planFooterRow}>
                  <Text style={styles.planPrice}>
                    ₹{plan.price.toLocaleString()}/month
                  </Text>
                  {isSelected && (
                    <View style={styles.stepperContainer}>
                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => decrement(plan.id)}>
                        <Ionicons
                          name="remove"
                          size={20}
                          color={COLORS.LIGHT_WHITE}
                        />
                      </TouchableOpacity>
                      <Text style={styles.stepperValue}>{planQty}</Text>
                      <TouchableOpacity
                        style={[
                          styles.stepperBtn,
                          planQty >= 2 && styles.changeBgBtn,
                        ]}
                        onPress={() => increment(plan.id)}>
                        <Ionicons
                          name="add"
                          size={20}
                          color={
                            planQty >= 2 ? COLORS.DARK : COLORS.LIGHT_WHITE
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.subscribeBtn}
          onPress={() => navigation.navigate('PaymentMethod')}>
          <Text style={styles.subscribeBtnText}>Subscribe now</Text>
        </TouchableOpacity>
        <Pressable style={styles.receiptBtn}>
          <Text style={styles.receiptBtnText}>View Receipt</Text>
        </Pressable>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: SCREEN_HEIGHT * 0.04,
  },
  logo: {
    alignSelf: 'flex-start',
    marginLeft: SCREEN_WIDTH * 0.04,
  },
  heading: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xxl,
    marginBottom: SCREEN_HEIGHT * 0.01,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  subheading: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
  plansContainer: {
    gap: SCREEN_HEIGHT * 0.018,
    marginTop: SCREEN_HEIGHT * 0.12,
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  planBox: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 12,
    padding: SCREEN_WIDTH * 0.045,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  planBoxSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.GRAY,
  },
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.008,
  },
  planTitle: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    marginRight: SCREEN_WIDTH * 0.02,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: SCREEN_WIDTH * 0.02,
  },
  badgeText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.xs,
  },
  radioOuter: {
    marginLeft: 'auto',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.LIGHT_GRAY_3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.PRIMARY,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY,
  },
  planDescription: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
    marginBottom: SCREEN_HEIGHT * 0.012,
  },
  planFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  planPrice: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: COLORS.LIGHT_GRAY_3,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 8,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBgBtn: {
    backgroundColor: COLORS.PRIMARY,
  },
  stepperValue: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  stepperColorChange: {
    color: COLORS.DARK,
  },
  subscribeBtn: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    height: SCREEN_HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  subscribeBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
  receiptBtn: {
    marginTop: SCREEN_HEIGHT * 0.01,
    alignItems: 'center',
  },
  receiptBtnText: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.md,
    textDecorationLine: 'underline',
  },
});

export default SubscribeScreen;
