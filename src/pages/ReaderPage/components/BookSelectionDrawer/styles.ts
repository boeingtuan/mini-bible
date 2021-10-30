import { StyleSheet } from 'react-native';

import { Colors, Fonts, WINDOW_WIDTH } from '~/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxWrapper: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 10,
    ...Fonts.L18,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    marginHorizontal: 10,
    width: 20,
    height: 20,
  },
  headerBookName: {
    ...Fonts.B18,
  },
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chapterWrapper: {
    flexBasis: (WINDOW_WIDTH * 0.9) / 5 - 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  chapterText: {
    ...Fonts.B16,
  },
  chapterSelectedText: {
    color: Colors.primary,
  },
});
