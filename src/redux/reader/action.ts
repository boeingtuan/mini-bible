import { ActionType, ReaderAction } from './const';

export const setReaderBook = (book: string, chapter: number): ReaderAction => {
  return {
    type: ActionType.SET_READER_BOOK,
    payload: {
      book,
      chapter,
    },
  };
};

export const setReaderOffset = (offset: number): ReaderAction => {
  return {
    type: ActionType.SET_READER_OFFSET,
    payload: {
      offset,
    },
  };
};

export const clearReaderOffset = (): ReaderAction => {
  return {
    type: ActionType.SET_READER_OFFSET,
    payload: {
      offset: undefined,
    },
  };
};
