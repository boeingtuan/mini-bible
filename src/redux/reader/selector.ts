import { RootState } from '~/redux/store';

export const selectReaderData = (state: RootState) => {
  const {
    readerReducer: { currentChapter, currentBook, offset },
  } = state;
  return { currentChapter, currentBook, offset };
};
