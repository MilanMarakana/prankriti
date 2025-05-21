import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/colors';
import {FONT_FAMILY} from '../../constants/fonts';
import {
  FONT_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  scale,
  SPACING,
  BORDER_RADIUS,
} from '../../constants/responsive';
import {useHomeStore} from '../../store/homeStore';
import CommonBtn from '../../components/UIComponent/commonBtn';
import Leaf from '../../assets/svg/single-leaf.svg';
import Svg, {Path} from 'react-native-svg';
// Care tip icons
import CarrotIcon from '../../assets/svg/carrot.svg';
import ScissorsIcon from '../../assets/svg/scissors.svg';
import BinIcon from '../../assets/svg/bin.svg';
import LeafIcon from '../../assets/svg/leaf.svg';

const CARE_TIPS = [
  {
    icon: <CarrotIcon width={scale(16)} height={scale(16)} />,
    text: 'Plant root vegetable',
    color: COLORS.LIGHT_WHITE,
    iconBg: COLORS.PRIMARY,
    isAvoid: false,
  },
  {
    icon: <ScissorsIcon width={scale(16)} height={scale(16)} />,
    text: 'Propagate plants by cuttings',
    color: COLORS.LIGHT_WHITE,
    iconBg: COLORS.PRIMARY,
    isAvoid: false,
  },
  {
    icon: <BinIcon width={scale(16)} height={scale(16)} />,
    text: 'Avoid reporting plants',
    color: COLORS.ERROR,
    iconBg: COLORS.ERROR,
    isAvoid: true,
  },
  {
    icon: <LeafIcon width={scale(16)} height={scale(16)} />,
    text: 'Avoid planting in open ground',
    color: COLORS.ERROR,
    iconBg: COLORS.ERROR,
    isAvoid: true,
  },
  {
    icon: <CarrotIcon width={scale(16)} height={scale(16)} />,
    text: 'Harvest root vegetables',
    color: COLORS.LIGHT_WHITE,
    iconBg: COLORS.PRIMARY,
    isAvoid: false,
  },
];

const ARC_SIZE = scale(270);
const ARC_STROKE = scale(13);
const ARC_RADIUS = (ARC_SIZE - ARC_STROKE) / 2;
const ARC_PERCENT = 0.75; // 75% of the circle
const ARC_START_ANGLE = -135; // Start at top left
const ARC_END_ANGLE = 135; // End at bottom right

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
  ].join(' ');
  return d;
}
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

const PlantDetails = () => {
  const navigation = useNavigation();
  const {selectedPlant} = useHomeStore();

  if (!selectedPlant) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: SPACING.xl}}>
        {/* Image and Back Button */}
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={scale(22)}
              color={COLORS.DARK}
            />
          </TouchableOpacity>
          <Image
            source={
              typeof selectedPlant.image === 'string'
                ? {uri: selectedPlant.image}
                : selectedPlant.image
            }
            style={styles.plantImage}
          />
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.plantName}>{selectedPlant.name}</Text>
          <Text style={styles.otherName}>
            Other Name: Medicinal Aloe, Barbados Aloe, Bitter Aloe, Aloe Vera
          </Text>

          <Text style={styles.instructionTitle}>Instruction</Text>
          <Text style={styles.instructionDesc}>
            Aloes, like other succulents, do not need to much water. It's
            therefore important to make sure that it is allowed to dry out
            completely between waterings.
          </Text>

          {/* Numbered Instructions */}
          <View style={styles.instructionsList}>
            <View style={styles.instructionItemRow}>
              <View style={styles.instructionNum}>
                <Text style={styles.instructionNumText}>1</Text>
              </View>
              <Text style={styles.instructionItemText}>
                Pour water over soil
              </Text>
            </View>
            <View style={styles.instructionItemRow}>
              <View style={styles.instructionNum}>
                <Text style={styles.instructionNumText}>2</Text>
              </View>
              <Text style={styles.instructionItemText}>
                Continue adding water until it starts to run out from the
                drainage hole
              </Text>
            </View>
            <View style={styles.instructionItemRow}>
              <View style={styles.instructionNum}>
                <Text style={styles.instructionNumText}>3</Text>
              </View>
              <Text style={styles.instructionItemText}>
                Make sure you remove all the collected water from the pot
                afterwards
              </Text>
            </View>
          </View>

          {/* CO2 Absorption Rate */}
          <View style={styles.co2Section}>
            <Text style={styles.co2Title}>CO₂ Absorption Rate</Text>
            <View style={styles.co2CircleWrap}>
              <Svg width={ARC_SIZE} height={ARC_SIZE}>
                {/* Background arc (gray) */}
                <Path
                  d={describeArc(
                    ARC_SIZE / 2,
                    ARC_SIZE / 2,
                    ARC_RADIUS,
                    ARC_START_ANGLE,
                    ARC_END_ANGLE,
                  )}
                  stroke={'rgba(159, 206, 3, 0.15)'}
                  strokeWidth={ARC_STROKE}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Foreground arc (primary) */}
                <Path
                  d={describeArc(
                    ARC_SIZE / 2,
                    ARC_SIZE / 2,
                    ARC_RADIUS,
                    ARC_START_ANGLE,
                    ARC_START_ANGLE +
                      (ARC_END_ANGLE - ARC_START_ANGLE) * ARC_PERCENT,
                  )}
                  stroke={COLORS.PRIMARY}
                  strokeWidth={ARC_STROKE}
                  fill="none"
                  strokeLinecap="round"
                />
              </Svg>
              <View style={styles.co2CenterContent} pointerEvents="none">
                <Leaf
                  width={scale(36)}
                  height={scale(36)}
                  style={styles.co2LeafIcon}
                />
                <Text style={styles.co2Value}>1,380kg</Text>
                <Text style={styles.co2Sub}>of CO₂ Reduce Daily</Text>
              </View>
            </View>
          </View>

          {/* Care Tips */}
          <View style={styles.careSection}>
            <Text style={styles.careTitle}>Care tips for this plant</Text>
            {CARE_TIPS.map((tip, idx) => (
              <View key={idx} style={styles.careTipRow}>
                <View
                  style={[
                    styles.careTipIconBox,
                    {backgroundColor: tip.iconBg},
                  ]}>
                  {tip.icon}
                </View>
                <Text style={[styles.careTipText, {color: tip.color}]}>
                  {tip.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Button */}
          <CommonBtn
            title="Add this plant to your list"
            onPress={() => {}}
            style={styles.addBtn}
            textStyle={styles.addBtnText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.DARK,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.DARK,
  },
  imageSection: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    paddingBottom: SPACING.md,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    left: SPACING.md,
    zIndex: 2,
    backgroundColor: 'rgba(119, 126, 144, 0.3)',
    borderRadius: BORDER_RADIUS.round,
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    marginTop: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    resizeMode: 'contain',
  },
  detailsSection: {
    padding: SPACING.lg,
  },
  plantName: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xxl,
    marginBottom: scale(2),
  },
  otherName: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
  },
  instructionTitle: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    marginBottom: scale(2),
  },
  instructionDesc: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
  },
  instructionsList: {
    marginBottom: SPACING.md,
  },
  instructionItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  instructionNum: {
    width: scale(52),
    height: scale(52),
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  instructionNumText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.xxl,
  },
  instructionItemText: {
    width: '90%',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.md,
  },
  co2Section: {
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.lg,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  co2Title: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.xl,
  },
  co2CircleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  co2CenterContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ARC_SIZE,
    height: ARC_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  co2LeafIcon: {
    marginBottom: scale(8),
    zIndex: 2,
  },
  co2Value: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.xxxl,
    zIndex: 2,
  },
  co2Sub: {
    color: COLORS.LIGHT_WHITE,
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.md,
  },
  careSection: {
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  careTitle: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.lg,
    marginBottom: SPACING.md_ex,
  },
  careTipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  careTipIconBox: {
    width: scale(28),
    height: scale(28),
    borderRadius: BORDER_RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(14),
  },
  careTipText: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: FONT_SIZE.md,
  },
  addBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.xxl,
    marginTop: scale(10),
    width: '100%',
    alignSelf: 'center',
  },
  addBtnText: {
    color: COLORS.DARK,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.md,
  },
});

export default PlantDetails;
