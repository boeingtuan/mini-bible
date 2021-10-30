import React from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { generateVerseId } from '~/utils';
import { VerseType } from '~/type/BibleType';
import {
  clearFavoriteVerse,
  setFavoriteVerse,
} from '~/redux/favoriteVerses/action';

import { Colors, Fonts } from '~/styles';

type Props = {
  verse: VerseType;
  isFavorite: boolean;
};

const Verse: React.FC<Props> = ({ verse, isFavorite }: Props) => {
  const dispatch = useDispatch();
  const onPress = React.useCallback(() => {
    if (isFavorite) {
      Alert.alert(
        'Notice',
        'Do you want to remove this verse of your favorite',
        [
          {
            text: 'Yes',
            onPress: () => {
              dispatch(clearFavoriteVerse(generateVerseId(verse)));
            },
          },
          {
            text: 'No',
          },
        ],
      );
    } else {
      dispatch(setFavoriteVerse(verse));
    }
  }, [dispatch, isFavorite, verse]);
  return (
    <Text onPress={onPress} style={isFavorite ? styles.favoriteVerseText : {}}>
      <Text style={styles.verseNumberText}>
        {verse.verseNumber !== 1 && ' '}({verse.verseNumber}){' '}
      </Text>
      {verse.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  verseNumberText: {
    ...Fonts.L14,
    fontStyle: 'italic',
  },
  favoriteVerseText: {
    backgroundColor: Colors.yellow,
  },
});

export default Verse;
