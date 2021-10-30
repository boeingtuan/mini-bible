import { RootState } from '~/redux/store';
import { VerseType } from '~/type/BibleType';

export const selectChapterData = (
  state: RootState,
): {
  isLoading: boolean;
  error?: string;
  verses?: VerseType[];
} => {
  const {
    bibleReducer: { books, isLoading, error },
    readerReducer: { currentBook, currentChapter },
  } = state;

  return {
    isLoading,
    error,
    verses: books[currentBook]?.chapters?.[currentChapter]?.verses,
  };
};
