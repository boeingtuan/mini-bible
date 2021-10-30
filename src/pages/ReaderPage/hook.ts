import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TextLayoutEventData,
  TextLayoutLine,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { sleep } from '~/utils';
import { VerseType } from '~/type/BibleType';
import { setReaderOffset } from '~/redux/reader/action';
import { selectFavoriteVerseList } from '~/redux/favoriteVerses/selector';
import { selectReaderData } from '~/redux/reader/selector';

import { SCROLL_VIEW_PADDING_TOP } from './styles';

let isScrollToOffsetWhenFirstOpenApp = false;

export const useScrollReader = ({
  verses,
  scrollToVerse,
  clearScrollToVerse,
}: {
  verses?: VerseType[];
  scrollToVerse?: number;
  clearScrollToVerse: () => void;
}) => {
  const dispatch = useDispatch();
  const {
    currentBook,
    currentChapter,
    offset: readerOffset,
  } = useSelector(selectReaderData);

  const textLinesRef = React.useRef<TextLayoutLine[]>([]);
  const scrollRef = React.useRef<ScrollView>(null);

  const handleScrollToVerse = React.useCallback(async (verseNumber: number) => {
    if (textLinesRef.current.length === 0 || !scrollRef.current) {
      await sleep(1000);
    }
    if (textLinesRef.current.length === 0 || !scrollRef.current) {
      return;
    }
    const lineIndex = textLinesRef.current.findIndex(line =>
      line.text.includes(`(${verseNumber}) `),
    );

    scrollRef.current.scrollTo({
      y: textLinesRef.current[lineIndex].y + SCROLL_VIEW_PADDING_TOP,
      animated: true,
    });
  }, []);

  const handleScrollToOffset = React.useCallback(async (offset: number) => {
    if (!scrollRef.current) {
      await sleep(1000);
    }
    if (!scrollRef.current) {
      return;
    }
    scrollRef.current.scrollTo({
      y: offset,
      animated: false,
    });
  }, []);

  const onTextLayoutHandler = React.useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      textLinesRef.current = event.nativeEvent.lines;
    },
    [],
  );

  const onScrollHandler = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      dispatch(setReaderOffset(event.nativeEvent.contentOffset.y));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!verses) {
      return;
    }

    if (readerOffset && !isScrollToOffsetWhenFirstOpenApp) {
      handleScrollToOffset(readerOffset);
      isScrollToOffsetWhenFirstOpenApp = true;
    } else if (scrollToVerse) {
      handleScrollToVerse(scrollToVerse);
      clearScrollToVerse();
    }
  }, [
    dispatch,
    handleScrollToOffset,
    handleScrollToVerse,
    verses,
    scrollToVerse,
    clearScrollToVerse,
  ]);

  React.useEffect(() => {
    handleScrollToOffset(0);
    return () => {
      textLinesRef.current = [];
    };
  }, [currentBook, currentChapter, handleScrollToOffset]);

  return {
    scrollRef,
    onTextLayoutHandler,
    onScrollHandler,
  };
};

export const useFavoriteVerses = (
  currentBook: string,
  currentChapter: number,
) => {
  const favoriteVerseList = useSelector(selectFavoriteVerseList);

  return React.useMemo(
    () =>
      favoriteVerseList.reduce<{ [verseNumber: number]: boolean }>(
        (acc, { verse }) => {
          if (verse.book === currentBook && verse.chapter === currentChapter) {
            acc[verse.verseNumber] = true;
          }
          return acc;
        },
        {},
      ),
    [currentBook, currentChapter, favoriteVerseList],
  );
};
