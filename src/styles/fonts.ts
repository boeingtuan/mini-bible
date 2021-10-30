import { Colors } from '~/styles/colors';

export enum FontWeight {
  light = '300',
  regular = '400',
  bold = '600',
}

const LightFontMixin = {
  color: Colors.black,
  fontWeight: FontWeight.light,
};

const RegularFontMixin = {
  color: Colors.black,
  fontWeight: FontWeight.regular,
};

const BoldFontMixin = {
  color: Colors.black,
  fontWeight: FontWeight.bold,
};

export const Fonts = {
  L12: {
    ...LightFontMixin,
    fontSize: 12,
  },
  L14: {
    ...LightFontMixin,
    fontSize: 14,
  },
  L16: {
    ...LightFontMixin,
    fontSize: 16,
  },
  L18: {
    ...LightFontMixin,
    fontSize: 18,
  },
  R12: {
    ...RegularFontMixin,
    fontSize: 12,
  },
  R14: {
    ...RegularFontMixin,
    fontSize: 14,
  },
  R16: {
    ...RegularFontMixin,
    fontSize: 16,
  },
  R18: {
    ...RegularFontMixin,
    fontSize: 18,
  },
  B12: {
    ...BoldFontMixin,
    fontSize: 12,
  },
  B14: {
    ...BoldFontMixin,
    fontSize: 14,
  },
  B16: {
    ...BoldFontMixin,
    fontSize: 16,
  },
  B18: {
    ...BoldFontMixin,
    fontSize: 18,
  },
};
