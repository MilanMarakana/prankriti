import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {
  FONT_SIZE,
  BORDER_RADIUS,
  scale,
  SCREEN_HEIGHT,
} from '../../../constants/responsive';
import {useCreditStore} from '../../../store/creditStore';
import MoneyIcon from '../../../assets/svg/money.svg';
import MoneySendIcon from '../../../assets/svg/money-send.svg';
import MoneyReceiveIcon from '../../../assets/svg/money-receive.svg';
import WalletAddIcon from '../../../assets/svg/empty-wallet-add.svg';
import WalletRemoveIcon from '../../../assets/svg/empty-wallet-remove.svg';

const ICONS: Record<string, any> = {
  money: MoneyIcon,
  'money-send': MoneySendIcon,
  'money-receive': MoneyReceiveIcon,
  'empty-wallet-add': WalletAddIcon,
  'empty-wallet-remove': WalletRemoveIcon,
};

const VISIBLE_ITEMS = 4;

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) +
    ' | ' +
    d.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
  );
};

const CreditHistoryList = () => {
  const {history, planHistory, historyTab} = useCreditStore();
  const data = historyTab === 'credit' ? history : planHistory;
  return (
    <View style={styles.container}>
      <FlashList
        data={data as any[]}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: any}) => {
          const Icon = ICONS[item.icon as string];
          if (historyTab === 'credit') {
            const isCredit = item.type === 'credit';
            const iconBg = COLORS.GRAY;
            const iconColor = isCredit ? COLORS.DARK : COLORS.ERROR;
            return (
              <View style={styles.row}>
                <View style={[styles.iconCircle, {backgroundColor: iconBg}]}>
                  <Icon
                    width={scale(24)}
                    height={scale(24)}
                    color={iconColor}
                  />
                </View>
                <View style={styles.textCol}>
                  <Text style={styles.amount}>
                    {item.amount > 0 ? '+' : ''}
                    {item.amount} Pran Credit for{' '}
                    <Text style={styles.bold}>{item.title}</Text>
                  </Text>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
              </View>
            );
          } else if ('status' in item) {
            // plan history
            const isSuccess = item.status === 'success';
            const iconBg = COLORS.GRAY;
            const iconColor = isSuccess ? COLORS.PRIMARY : COLORS.ERROR;
            return (
              <View style={styles.row}>
                <View style={[styles.iconCircle, {backgroundColor: iconBg}]}>
                  <Icon
                    width={scale(24)}
                    height={scale(24)}
                    color={iconColor}
                  />
                </View>
                <View style={styles.textCol}>
                  <Text style={styles.amount}>{item.description}</Text>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
              </View>
            );
          } else {
            return null;
          }
        }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={VISIBLE_ITEMS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SCREEN_HEIGHT * 0.08,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  iconCircle: {
    width: scale(60),
    height: scale(60),
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(14),
  },
  textCol: {
    flex: 1,
  },
  amount: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.md,
    marginBottom: scale(2),
  },
  bold: {
    fontFamily: FONT_FAMILY.BOLD,
    color: COLORS.LIGHT_WHITE,
  },
  date: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
});

export default CreditHistoryList;
