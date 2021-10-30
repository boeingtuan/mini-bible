import React from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { PAGE_NAMES } from '~/const';
import { RootTabParamList } from '~/RootNavigation';
import { selectFavoriteVerseList } from '~/redux/favoriteVerses/selector';

import ClearAllButton from './components/ClearAllButton';
import FavoriteVerseItem from './components/FavoriteVerseItem';

import styles from './styles';
import { generateVerseId } from '~/utils';
import { setReaderBook } from '~/redux/reader/action';
import { ReaderPageName } from '~/pages/ReaderPage';

export type FavoritePageParam = undefined;

type Props = BottomTabScreenProps<
  RootTabParamList,
  PAGE_NAMES.FAVORITE_VERSE_PAGE
>;

const FavoriteVersePage: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const favoriteVerses = useSelector(selectFavoriteVerseList);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ClearAllButton />,
    });
  }, [navigation]);
  return (
    <ScrollView
      contentContainerStyle={styles.contentWrapper}
      style={styles.wrapper}>
      {favoriteVerses.map(({ verse, date }) => (
        <FavoriteVerseItem
          key={generateVerseId(verse)}
          verse={verse}
          date={date}
          onPress={() => {
            dispatch(setReaderBook(verse.book, verse.chapter));
            // @ts-ignore
            navigation.navigate(PAGE_NAMES.READER_PAGE, {
              screen: ReaderPageName,
              params: {
                scrollToVerse: verse.verseNumber,
              },
            });
          }}
        />
      ))}
    </ScrollView>
  );
};

export default FavoriteVersePage;
