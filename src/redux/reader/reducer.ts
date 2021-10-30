import { BIBLE_BOOKS } from '~/const';

import { ActionType, ReaderAction } from './const';

type ReaderState = {
  currentBook: string;
  currentChapter: number;
  offset?: number;
};

const initialState: ReaderState = {
  currentBook: BIBLE_BOOKS[0].id,
  currentChapter: 1,
  offset: undefined,
};

export const readerReducer = (
  state: ReaderState = initialState,
  action: ReaderAction,
): ReaderState => {
  switch (action.type) {
    case ActionType.SET_READER_BOOK: {
      const { book, chapter } = action.payload;
      return {
        ...state,
        currentBook: book,
        currentChapter: chapter,
      };
    }
    case ActionType.SET_READER_OFFSET: {
      const { offset } = action.payload;
      return {
        ...state,
        offset,
      };
    }
    default: {
      return state;
    }
  }
};
