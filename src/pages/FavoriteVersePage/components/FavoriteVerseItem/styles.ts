import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '~/styles';

export default StyleSheet.create({
  wrapper: {
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: -1,
      height: 2,
    },
    shadowRadius: 1,
    shadowOpacity: 1.0,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titleText: {
    ...Fonts.B16,
    color: Colors.primary,
  },
  dateText: {
    ...Fonts.R14,
  },
  verseText: {
    ...Fonts.L14,
  },
  deleteBtn: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  deleteIcon: {
    width: 25,
    height: 25,
  },
});
