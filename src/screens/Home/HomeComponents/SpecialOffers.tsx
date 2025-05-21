import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SPECIAL_OFFERS} from '../../../constants/userDetails';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/fonts';
import {SCREEN_WIDTH, FONT_SIZE, SPACING} from '../../../constants/responsive';
import {useHomeStore} from '../../../store/homeStore';
import {RootStackParamList} from '../../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SpecialOffers = () => {
  const navigation = useNavigation<NavigationProp>();
  const {setSelectedPlant} = useHomeStore();
  const [favorites, setFavorites] = useState(
    SPECIAL_OFFERS.map(p => p.isFavorite),
  );

  const toggleFavorite = (idx: number) => {
    setFavorites(favs => {
      const updated = [...favs];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const handlePlantPress = (plant: any) => {
    setSelectedPlant({
      id: plant.id,
      name: plant.name,
      image: plant.image,
      price: plant.price,
      description:
        plant.description || 'A beautiful plant that will enhance your space.',
      careInstructions: {
        watering: 'Water once a week',
        sunlight: 'Bright indirect sunlight',
        temperature: '18-24°C',
      },
      features: ['Air purifying', 'Low maintenance', 'Pet friendly'],
    });
    navigation.navigate('PlantDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Special Offers</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <FlashList
        data={SPECIAL_OFFERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePlantPress(item)}>
            <View style={styles.imageWrap}>
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.favIconWrap}
                onPress={() => toggleFavorite(index)}>
                <AntDesign
                  name={'hearto'}
                  size={22}
                  color={
                    favorites[index] ? COLORS.PRIMARY : COLORS.LIGHT_GRAY_4
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardName}>{item.name}</Text>
            <View style={styles.statsRow}>
              <MaterialIcons name="star" size={18} color={COLORS.PRIMARY} />
              <Text style={styles.rating}>{item.rating}</Text>
              <View style={styles.soldBox}>
                <Text style={styles.soldText}>
                  {item.sold.toLocaleString()} Sold
                </Text>
              </View>
            </View>
            <Text style={styles.price}>₹{item.price}</Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={200}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  title: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xl,
  },
  seeAll: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.md,
  },
  listContent: {
    paddingLeft: SPACING.md,
    paddingBottom: SPACING.md,
  },
  card: {
    width: SCREEN_WIDTH * 0.48,
    borderRadius: 22,
    marginRight: SPACING.md,
    paddingBottom: SPACING.md,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  imageWrap: {
    width: SCREEN_WIDTH * 0.48,
    height: SCREEN_WIDTH * 0.48,
    borderRadius: 22,
    backgroundColor: COLORS.GRAY,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  favIconWrap: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(35, 38, 47, 0.6)',
    borderRadius: 16,
    padding: 2,
    zIndex: 2,
  },
  cardName: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    marginTop: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
    gap: 6,
  },
  rating: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.sm,
    marginLeft: 2,
    marginRight: 6,
  },
  soldBox: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  soldText: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xs,
  },
  price: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xl,
    marginTop: SPACING.md,
  },
});

export default SpecialOffers;
