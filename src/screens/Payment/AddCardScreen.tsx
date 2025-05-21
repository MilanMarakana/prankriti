/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MostCommonLayout from '../../components/CommonLayout/MostCommonLayout';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  scale,
  verticalScale,
  moderateScale,
  FONT_SIZE,
  BORDER_RADIUS,
} from '../../constants/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonInput from '../../components/UIComponent/CommonInput';
import CommonBtn from '../../components/UIComponent/commonBtn';
import {validateCardForm} from '../../utils/validation';
import {useSavedCardsStore} from '../../store/savedCardsStore';

const AddCardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Determine card type from params or default to 'credit'
  const cardType = (route as any).params?.type || 'credit';
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [errors, setErrors] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [touched, setTouched] = useState({
    cardHolder: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
  });
  const {setCreditCard, setDebitCard} = useSavedCardsStore();

  const handleAddCard = () => {
    const validation = validateCardForm(cardName, cardNumber, expiry, cvv);
    setErrors(validation.errors);
    setTouched({cardHolder: true, cardNumber: true, expiry: true, cvv: true});
    if (!validation.isValid) return;
    const card = {
      type: cardType,
      cardNumber,
      cardHolder: cardName,
      expiry,
      cvv,
    };
    if (cardType === 'credit') setCreditCard(card);
    else setDebitCard(card);
    navigation.goBack();
  };

  // Disable button only if there is any error
  const isDisabled = Object.values(errors).some(error => !!error);

  return (
    <MostCommonLayout showLogo={false}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={COLORS.LIGHT_WHITE}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add new card</Text>
              <View style={{width: 40}} />
            </View>
            {/* Card Image */}
            <View style={styles.cardImage}>
              <View style={styles.cardRow}>
                <MaterialIcons
                  name="contactless"
                  size={28}
                  color={COLORS.DARK}
                />
                <FontAwesome
                  name="cc-visa"
                  size={32}
                  color={COLORS.DARK}
                  style={{marginLeft: 'auto'}}
                />
              </View>
              <Text style={styles.cardNumber}>
                {cardNumber || 'XXXX XXXX XXXX XXXX'}
              </Text>
              <View style={styles.cardDetailsRow}>
                <View>
                  <Text style={styles.cardLabel}>Card holder name</Text>
                  <Text style={styles.cardValue}>{cardName || 'John Doe'}</Text>
                </View>
                <View style={{marginLeft: scale(24)}}>
                  <Text style={styles.cardLabel}>Expiry date</Text>
                  <Text style={styles.cardValue}>{expiry || 'MM/YY'}</Text>
                </View>
                <MaterialCommunityIcons
                  name="integrated-circuit-chip"
                  size={40}
                  color={COLORS.DARK}
                  style={{marginLeft: 'auto'}}
                />
              </View>
            </View>
            {/* Form */}
            <View style={styles.formSection}>
              <CommonInput
                label="Cardholder Name"
                value={cardName}
                onChangeText={text => {
                  setCardName(text);
                  const validation = validateCardForm(
                    text,
                    cardNumber,
                    expiry,
                    cvv,
                  );
                  setErrors(validation.errors);
                }}
                leftIcon={<Ionicons name="person-outline" size={20} />}
                error={touched.cardHolder ? errors.cardHolder : ''}
                onBlur={() => setTouched(t => ({...t, cardHolder: true}))}
              />
              <CommonInput
                label="Card Number"
                value={cardNumber}
                onChangeText={text => {
                  let cleaned = text.replace(/[^0-9]/g, '').slice(0, 16);
                  let formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
                  setCardNumber(formatted);
                  const validation = validateCardForm(
                    cardName,
                    formatted,
                    expiry,
                    cvv,
                  );
                  setErrors(validation.errors);
                }}
                leftIcon={<MaterialIcons name="credit-card" size={20} />}
                error={touched.cardNumber ? errors.cardNumber : ''}
                onBlur={() => setTouched(t => ({...t, cardNumber: true}))}
                keyboardType="numeric"
                maxLength={19}
              />
              <View style={styles.rowInputs}>
                <View style={{flex: 1, marginRight: scale(8)}}>
                  <CommonInput
                    label="Expiry Date"
                    value={expiry}
                    onChangeText={text => {
                      let cleaned = text.replace(/[^0-9]/g, '');
                      if (cleaned.length > 2) {
                        cleaned =
                          cleaned.slice(0, 2) + ' / ' + cleaned.slice(2, 4);
                      }
                      setExpiry(cleaned);
                      const validation = validateCardForm(
                        cardName,
                        cardNumber,
                        cleaned,
                        cvv,
                      );
                      setErrors(validation.errors);
                    }}
                    leftIcon={<MaterialIcons name="calendar-today" size={22} />}
                    error={touched.expiry ? errors.expiry : ''}
                    onBlur={() => setTouched(t => ({...t, expiry: true}))}
                    maxLength={7}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{flex: 1, marginLeft: scale(8)}}>
                  <CommonInput
                    label="CVV"
                    value={cvv}
                    onChangeText={text => {
                      setCvv(text);
                      const validation = validateCardForm(
                        cardName,
                        cardNumber,
                        expiry,
                        text,
                      );
                      setErrors(validation.errors);
                    }}
                    leftIcon={<Ionicons name="lock-closed-outline" size={22} />}
                    error={touched.cvv ? errors.cvv : ''}
                    onBlur={() => setTouched(t => ({...t, cvv: true}))}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
              <View style={styles.saveRow}>
                <Text style={styles.saveLabel}>
                  Save this card for future payments.
                </Text>
                <Switch
                  value={saveCard}
                  onValueChange={setSaveCard}
                  trackColor={{false: COLORS.GRAY, true: COLORS.PRIMARY}}
                  thumbColor={COLORS.WHITE}
                  ios_backgroundColor={COLORS.GRAY}
                />
              </View>
            </View>
            {/* Add Card Button */}
            <CommonBtn
              title="Add card"
              onPress={handleAddCard}
              isDisabled={isDisabled}
              style={styles.addCardBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MostCommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DARK,
    width: '100%',
    paddingTop: verticalScale(28),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(24),
    width: '100%',
    paddingHorizontal: 0,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.xl,
    fontFamily: FONT_FAMILY.BOLD,
    textAlign: 'center',
    flex: 1,
  },
  cardImage: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(24),
    marginBottom: verticalScale(32),
    marginTop: verticalScale(8),
    shadowColor: COLORS.DARK,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  cardNumber: {
    color: COLORS.DARK,
    fontSize: moderateScale(26),
    fontFamily: FONT_FAMILY.BOLD,
    letterSpacing: 2,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  cardDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  cardLabel: {
    color: COLORS.DARK,
    fontSize: FONT_SIZE.xxs,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
  cardValue: {
    color: COLORS.DARK,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    marginTop: 2,
  },
  formSection: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: verticalScale(16),
  },
  inputLabel: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    marginBottom: 6,
    marginTop: verticalScale(8),
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.DARK,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  inputIcon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
    padding: 0,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  saveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  saveLabel: {
    color: COLORS.LIGHT_WHITE,
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  addCardBtn: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.xxl,
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(16),
  },
  addCardBtnText: {
    color: COLORS.DARK,
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_FAMILY.BOLD,
  },
});

export default AddCardScreen;
