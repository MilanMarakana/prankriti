// Font family names as they appear in the assets folder
export const FONT_FAMILY = {
  // Regular variants
  BLACK: 'GilroyBlack',
  BOLD: 'GilroyBold',
  EXTRA_BOLD: 'GilroyExtraBold',
  HEAVY: 'GilroyHeavy',
  LIGHT: 'GilroyLight',
  MEDIUM: 'GilroyMedium',
  REGULAR: 'GilroyRegular',
  SEMI_BOLD: 'GilroySemiBold',
  THIN: 'GilroyThin',
  ULTRA_LIGHT: 'GilroyUltraLight',

  // Italic variants
  BLACK_ITALIC: 'GilroyBlackItalic',
  BOLD_ITALIC: 'GilroyBoldItalic',
  EXTRA_BOLD_ITALIC: 'GilroyExtraBoldItalic',
  HEAVY_ITALIC: 'GilroyHeavyItalic',
  LIGHT_ITALIC: 'GilroyLightItalic',
  MEDIUM_ITALIC: 'GilroyMediumItalic',
  REGULAR_ITALIC: 'GilroyRegularItalic',
  SEMI_BOLD_ITALIC: 'GilroySemiBoldItalic',
  THIN_ITALIC: 'GilroyThinItalic',
  ULTRA_LIGHT_ITALIC: 'GilroyUltraLightItalic',
} as const;

// Font weight constants - these match React Native's font weight values
export const FONT_WEIGHTS = {
  BLACK: '900',
  EXTRA_BOLD: '800',
  BOLD: '700',
  SEMI_BOLD: '600',
  MEDIUM: '500',
  REGULAR: '400',
  LIGHT: '300',
  THIN: '200',
  ULTRA_LIGHT: '100',
} as const;

// Helper function to get font style
export const getFontStyle = (
  weight: keyof typeof FONT_WEIGHTS,
  isItalic = false,
) => {
  const fontFamily = isItalic
    ? FONT_FAMILY[`${weight}_ITALIC` as keyof typeof FONT_FAMILY]
    : FONT_FAMILY[weight as keyof typeof FONT_FAMILY];

  return {
    fontFamily,
    fontWeight: FONT_WEIGHTS[weight],
  };
};
