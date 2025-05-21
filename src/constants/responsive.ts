import {Dimensions, PixelRatio, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Based on iPhone 11 Pro Max's scale
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

// Scale factor for width
export const scale = (size: number) =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;

// Scale factor for height
export const verticalScale = (size: number) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

// Scale factor for font size
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Get pixel ratio
export const getPixelRatio = () => PixelRatio.get();

// Get font scale
export const getFontScale = () => PixelRatio.getFontScale();

// Check if device is tablet
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  return (
    (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) ||
    (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920))
  );
};

// Check if device is small
export const isSmallDevice = () => SCREEN_WIDTH < 375;

// Get platform specific scale
export const platformScale = (iosSize: number, androidSize: number) =>
  Platform.select({
    ios: scale(iosSize),
    android: scale(androidSize),
  });

// Spacing
export const SPACING = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  md_ex: scale(18),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(40),
};

// Font Sizes
export const FONT_SIZE = {
  xxs: moderateScale(10),
  xs: moderateScale(12),
  sm: moderateScale(14),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xlt: moderateScale(28),
  xxxl: moderateScale(32),
};

// Border Radius
export const BORDER_RADIUS = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  md_ex: scale(14),
  lg: scale(16),
  xl: scale(24),
  xxl: scale(32),
  round: scale(9999),
};

// Icon Sizes
export const ICON_SIZE = {
  xs: scale(16),
  sm: scale(24),
  md: scale(32),
  lg: scale(40),
  xl: scale(48),
};

// Button Sizes
export const BUTTON_SIZE = {
  sm: {
    height: verticalScale(36),
    padding: scale(12),
  },
  md: {
    height: verticalScale(44),
    padding: scale(16),
  },
  mdBtn: {
    height: verticalScale(52),
    padding: scale(16),
  },
  lg: {
    height: verticalScale(60),
    padding: scale(20),
  },
  lgBtn: {
    height: verticalScale(64),
    padding: scale(20),
  },
};
