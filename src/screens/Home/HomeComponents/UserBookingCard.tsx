import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {
  BUTTON_SIZE,
  FONT_SIZE,
  SCREEN_WIDTH,
  SPACING,
} from '../../../constants/responsive';
import {UserBookingCardProps} from '../../../types/home';
import CommonBtn from '../../../components/UIComponent/commonBtn';
import {FlashList} from '@shopify/flash-list';
import {USER_CARDS} from '../../../constants/userDetails';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserBookingCard: React.FC<UserBookingCardProps> = ({
  data,
  // onPressDetails,
}) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(new Date(data.date));
  const [time, setTime] = useState(new Date(data.time));
  const [favorites, setFavorites] = useState(USER_CARDS.map(u => u.isFavorite));

  const toggleFavorite = (idx: number) => {
    console.log('toggleFavorite', idx);
    setFavorites(favs => {
      const updated = [...favs];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={require('../../../assets/images/user-1.png')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{data.user.name}</Text>
            <Text style={styles.occupation}>{data.user.occupation}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <TouchableOpacity
            style={styles.iconTextRow}
            onPress={() => setShowDate(true)}
            activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <EvilIcons name="calendar" size={18} color={COLORS.GRAY} />
            </View>
            <Text style={styles.infoText}>
              {date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconTextRow}
            onPress={() => setShowTime(true)}
            activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="clock-time-five-outline"
                size={18}
                color={COLORS.GRAY}
              />
            </View>
            <Text style={styles.infoText}>
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>
        <CommonBtn
          title="View Details"
          onPress={() => {}}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDate(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
        {showTime && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTime(false);
              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
          />
        )}
      </View>
      <FlashList
        data={USER_CARDS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.userCard}>
            <View style={styles.userImageWrap}>
              <Image source={item.image} style={styles.userCardImage} />
              <TouchableOpacity
                style={styles.favIconContainer}
                onPress={() => toggleFavorite(index)}>
                <AntDesign
                  name={'hearto'}
                  size={20}
                  color={
                    favorites[index] ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_4
                  }
                  onPress={() => toggleFavorite(index)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.userCardInfo}>
              <Text style={styles.userCardName}>{item.name}</Text>
              <Text style={styles.userCardSpecialty}>
                Specialty: {item.specialty}
              </Text>
              <Text style={styles.userCardPrice}>
                ₹{item.price}
                <Text style={styles.userCardPerHour}>/HR.</Text>
              </Text>
            </View>
          </View>
        )}
        estimatedItemSize={180}
        contentContainerStyle={styles.userCardList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 16,
    width: SCREEN_WIDTH * 0.89,
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.sm,
  },
  occupation: {
    color: COLORS.LIGHT_GRAY_3,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: 'rgba(35, 38, 47, 0.5)',
    padding: 8,
    borderRadius: 999,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(252, 252, 253, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  infoText: {
    color: COLORS.GRAY,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.sm,
  },
  button: {
    backgroundColor: COLORS.SUB_TEXT,
    borderRadius: 33,
    marginTop: 8,
    height: BUTTON_SIZE.mdBtn.height,
  },
  buttonText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
  userCardList: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  userCard: {
    width: SCREEN_WIDTH * 0.42,
    borderRadius: 22,
    marginRight: SPACING.md,
    paddingBottom: SPACING.sm,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  userImageWrap: {
    width: '100%',
    height: SCREEN_WIDTH * 0.8,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  userCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  favIconContainer: {
    width: SPACING.xl,
    height: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(35, 38, 47, 0.6)',
    borderRadius: SPACING.xl / 2,
    padding: 0,
    zIndex: 222222,
  },
  userCardInfo: {
    marginTop: SPACING.md,
    gap: SPACING.xs,
  },
  userCardName: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
  },
  userCardSpecialty: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.sm,
  },
  userCardPrice: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
  },
  userCardPerHour: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: FONT_SIZE.xs,
  },
});

export default UserBookingCard;
