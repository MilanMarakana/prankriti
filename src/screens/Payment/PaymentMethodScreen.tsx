/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  scale,
  verticalScale,
  moderateScale,
  SPACING,
  BORDER_RADIUS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  FONT_SIZE,
} from '../../constants/responsive';
import {PaymentMethod} from '../../types/payment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSavedCardsStore} from '../../store/savedCardsStore';

const paymentMethods: PaymentMethod[] = [
  {
    key: 'upi',
    label: 'UPI',
    description: 'Pay with one-tap UPI',
    icon: <Ionicons name="card-outline" size={24} color={COLORS.LIGHT_WHITE} />,
  },
  {
    key: 'net_banking',
    label: 'Net banking',
    description: 'All Indian banks',
    icon: (
      <MaterialCommunityIcons
        name="bank-outline"
        size={24}
        color={COLORS.LIGHT_WHITE}
      />
    ),
  },
  {
    key: 'cod',
    label: 'Payment on delivery',
    description: 'Pay when our team member visits your space',
    icon: (
      <MaterialCommunityIcons
        name="hand-coin-outline"
        size={24}
        color={COLORS.LIGHT_WHITE}
      />
    ),
  },
  {
    key: 'credit_card',
    label: 'Credit card',
    icon: <Ionicons name="card-outline" size={24} color={COLORS.LIGHT_WHITE} />,
    isCard: true,
  },
  {
    key: 'debit_card',
    label: 'Debit card',
    icon: <Ionicons name="card-outline" size={24} color={COLORS.LIGHT_WHITE} />,
    isCard: true,
  },
];

// Add type for CardDisplay props
interface CardDisplayProps {
  card: {cardNumber: string; cardHolder: string; expiry: string};
  onRemove: () => void;
}

const CardDisplay = ({card}: CardDisplayProps) => {
  const cleaned = card.cardNumber.replace(/[^0-9]/g, '');
  const masked =
    cleaned.length >= 4
      ? '**** **** **** ' + cleaned.slice(-4)
      : '**** **** **** ' + cleaned;
  return (
    <View style={styles.savedCardContainer}>
      <View style={styles.savedCardRow}>
        <MaterialCommunityIcons
          name="credit-card"
          size={24}
          color={COLORS.LIGHT_WHITE}
        />
        <Text style={styles.savedCardNumber}>{masked}</Text>
      </View>
    </View>
  );
};

const PaymentMethodScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState('credit_card');
  const {creditCard, debitCard, removeCreditCard, removeDebitCard} =
    useSavedCardsStore();

  const isContinueEnabled = !!creditCard || !!debitCard;

  const handleContinue = () => {
    if (isContinueEnabled) {
      navigation.navigate('SuccessSubscribe');
    }
  };

  const renderMethod = (item: PaymentMethod) => {
    const isSelected = selected === item.key;
    if (item.key === 'credit_card' && creditCard) {
      return <CardDisplay card={creditCard} onRemove={removeCreditCard} />;
    }
    if (item.key === 'debit_card' && debitCard) {
      return <CardDisplay card={debitCard} onRemove={removeDebitCard} />;
    }
    return (
      <TouchableOpacity
        key={item.key}
        style={[styles.methodContainer, isSelected && styles.selectedMethod]}
        onPress={() => setSelected(item.key)}
        activeOpacity={0.8}>
        <View style={styles.iconWrap}>{item.icon}</View>
        <View style={{flex: 1}}>
          <Text style={styles.methodLabel}>{item.label}</Text>
          {!!item.description && (
            <Text style={styles.methodDesc}>{item.description}</Text>
          )}
        </View>
        {item.label === 'UPI' && (
          <Image
            source={require('../../assets/images/UPI.png')}
            style={styles.upiImage}
            resizeMode="contain"
          />
        )}
        {isSelected && (
          <AntDesign name="check" size={24} color={COLORS.PRIMARY} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <MostCommonLayout showLogo={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.extraContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={COLORS.LIGHT_WHITE}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Payment</Text>
          <View style={styles.extraContainer} />
        </View>
        <Text style={styles.subtitle}>
          Choose the payment method you'd like to use.
        </Text>
        <FlatList
          data={paymentMethods}
          renderItem={({item}) => renderMethod(item)}
          keyExtractor={item => item.key}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            <>
              {((selected === 'credit_card' && !creditCard) ||
                (selected === 'debit_card' && !debitCard)) && (
                <TouchableOpacity
                  style={styles.addCardBtn}
                  onPress={() =>
                    (navigation as any).navigate('AddCard', {
                      type: selected === 'credit_card' ? 'credit' : 'debit',
                    })
                  }>
                  <Text style={styles.addCardText}>Add New Card</Text>
                </TouchableOpacity>
              )}
            </>
          }
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.continueBtn, !isContinueEnabled && {opacity: 0.5}]}
            disabled={!isContinueEnabled}
            onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: verticalScale(32),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_HEIGHT * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  extraContainer: {
    width: '10%',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(60,60,60,1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.xl,
    fontFamily: FONT_FAMILY.BOLD,
    width: '80%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.REGULAR,
    marginBottom: SCREEN_HEIGHT * 0.07,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.DARK,
    borderRadius: BORDER_RADIUS.md_ex,
    padding: SPACING.md_ex,
    marginBottom: SCREEN_HEIGHT * 0.02,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  selectedMethod: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.DARK,
  },
  iconWrap: {
    marginRight: SPACING.md,
  },
  methodLabel: {
    color: COLORS.WHITE,
    fontSize: moderateScale(16),
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    marginBottom: 2,
  },
  methodDesc: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.xxs,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  upiImage: {
    width: scale(22),
    height: scale(22),
    marginRight: SPACING.sm,
  },
  checkMark: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: COLORS.PRIMARY,
    marginLeft: SPACING.md,
  },
  addCardBtn: {
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.md_ex,
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  addCardText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  continueBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.xxl,
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  continueText: {
    color: COLORS.DARK,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.BOLD,
  },
  listContent: {
    paddingBottom: SCREEN_HEIGHT * 0.1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: COLORS.DARK,
    paddingVertical: SPACING.md,
  },
  savedCardContainer: {
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.md_ex,
    padding: SPACING.md_ex,
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  savedCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedCardNumber: {
    color: COLORS.LIGHT_WHITE,
    fontSize: moderateScale(18),
    fontFamily: FONT_FAMILY.BOLD,
    marginLeft: scale(12),
    flex: 1,
  },
  removeCardBtn: {
    marginLeft: scale(8),
  },
  savedCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
  },
  savedCardLabel: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZE.xxs,
    fontFamily: FONT_FAMILY.REGULAR,
  },
});

export default PaymentMethodScreen;
