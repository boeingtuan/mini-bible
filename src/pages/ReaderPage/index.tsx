import React from 'react';
import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { BIBLE_BOOK_MAP, PAGE_NAMES } from '~/const';
import { RootTabParamList } from '~/RootNavigation';
import { loadChapter } from '~/redux/bible/action';
import { selectChapterData } from '~/redux/bible/selector';
import { selectReaderData } from '~/redux/reader/selector';

import Verse from './components/Verse';
import BookSelectionDrawer from './components/BookSelectionDrawer';
import { useFavoriteVerses, useScrollReader } from './hook';

import styles from './styles';
import { Colors } from '~/styles';

const Drawer = createDrawerNavigator();
export const ReaderPageName: 'ACTUAL_READER_PAGE' = 'ACTUAL_READER_PAGE';

export type ReaderPageParam = {
  scrollToVerse: number | undefined;
};

type RootDrawerParamList = {
  [ReaderPageName]: ReaderPageParam;
};
type Props = DrawerScreenProps<RootDrawerParamList, typeof ReaderPageName>;

const ReaderPage: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { verses, isLoading, error } = useSelector(selectChapterData);
  const { currentBook, currentChapter } = useSelector(selectReaderData);
  const favoriteVerses = useFavoriteVerses(currentBook, currentChapter);

  const { scrollRef, onTextLayoutHandler, onScrollHandler } = useScrollReader({
    verses,
    scrollToVerse: route.params?.scrollToVerse,
    clearScrollToVerse: React.useCallback(() => {
      navigation.setParams({ scrollToVerse: undefined });
    }, [navigation]),
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: `${BIBLE_BOOK_MAP[currentBook].name} ${currentChapter}`,
    });
    dispatch(loadChapter(currentBook, currentChapter));
  }, [currentBook, currentChapter, dispatch, navigation]);

  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.errorText}>{error ?? 'Something went wrong'}</Text>
      </View>
    );
  }

  if (!verses) {
    return null;
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.readerPageScrollWrapper}
      scrollEventThrottle={1000}
      onScroll={onScrollHandler}
      contentContainerStyle={styles.readerPageScrollContentWrapper}>
      <Text style={styles.wrapperText} onTextLayout={onTextLayoutHandler}>
        {verses.map((verse, index) => (
          <Verse
            key={`${currentBook}-${currentChapter}-${index}`}
            verse={verse}
            isFavorite={favoriteVerses[verse.verseNumber]}
          />
        ))}
      </Text>
    </ScrollView>
  );
};

const ReaderPageContainer: React.FC<
  BottomTabScreenProps<RootTabParamList, PAGE_NAMES.READER_PAGE>
> = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ReaderPageName}
      drawerContent={props => <BookSelectionDrawer {...props} />}>
      <Drawer.Screen
        name={ReaderPageName}
        component={ReaderPage}
        options={{
          drawerStyle: styles.drawerStyle,
          headerTitle: '',
        }}
      />
    </Drawer.Navigator>
  );
};

export default ReaderPageContainer;
