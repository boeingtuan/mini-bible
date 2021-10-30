import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '~/styles';

export const SCROLL_VIEW_PADDING_TOP = 50;

export default StyleSheet.create({
  drawerStyle: {
    width: '90%',
  },
  readerPageScrollWrapper: {
    backgroundColor: Colors.background,
  },
  readerPageScrollContentWrapper: {
    paddingTop: SCROLL_VIEW_PADDING_TOP,
    paddingLeft: 30,
    paddingRight: 15,
  },
  wrapperText: {
    ...Fonts.R16,
    lineHeight: 30,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  errorText: {
    ...Fonts.B18,
  },
});
